"""
Modal deployment for Fozan's fine-tuned Llama 3.1 8B Assistant
Serverless GPU inference with automatic scaling and model caching
"""

import modal

# Define the Modal app
app = modal.App("fozan-assistant")

# Create a volume to cache the model (persists between runs)
model_cache = modal.Volume.from_name("fozan-model-cache", create_if_missing=True)

# Define the container image with all dependencies
image = modal.Image.debian_slim(python_version="3.10").pip_install(
    "transformers>=4.40.0",
    "torch>=2.0.0",
    "accelerate>=0.27.0",
    "huggingface_hub",
    "sentencepiece",
    "fastapi[standard]",
)

# Model configuration
MODEL_ID = "fozan3060/fozan-assistant"
CACHE_PATH = "/model-cache"
SYSTEM_PROMPT = """You are Fozan's AI assistant on his portfolio website. You help visitors learn about Fozan's skills, experience, and services. Be friendly, professional, and helpful. Keep responses concise but informative."""


@app.cls(
    image=image,
    gpu="A10G",  # Use A10G GPU (faster, 24GB VRAM)
    timeout=300,
    scaledown_window=600,  # Keep warm for 10 min after request
    volumes={CACHE_PATH: model_cache},  # Mount the cache volume
)
class FozanAssistant:
    """Serverless LLM inference class with model caching"""

    @modal.enter()
    def load_model(self):
        """Load model when container starts - uses cache if available"""
        import os
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer

        # Check if model is already cached
        cache_dir = f"{CACHE_PATH}/model"

        print("Loading tokenizer...")
        self.tokenizer = AutoTokenizer.from_pretrained(
            MODEL_ID,
            cache_dir=cache_dir,
        )

        print("Loading model (this may take a while on first run)...")
        self.model = AutoModelForCausalLM.from_pretrained(
            MODEL_ID,
            torch_dtype=torch.float16,
            device_map="auto",
            cache_dir=cache_dir,
        )

        # Commit the cache so it persists
        model_cache.commit()

        print("Model loaded and cached!")

    @modal.method()
    def generate(self, message: str, history: list = None) -> str:
        """Generate a response to a message"""
        import torch

        if history is None:
            history = []

        # Build conversation
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for user_msg, assistant_msg in history:
            messages.append({"role": "user", "content": user_msg})
            messages.append({"role": "assistant", "content": assistant_msg})
        messages.append({"role": "user", "content": message})

        # Tokenize - apply_chat_template returns input_ids directly as tensor
        input_ids = self.tokenizer.apply_chat_template(
            messages,
            return_tensors="pt",
            add_generation_prompt=True,
            return_dict=False  # Return raw tensor, not BatchEncoding
        )

        # Move to device
        input_ids = input_ids.to(self.model.device)

        # Generate
        with torch.no_grad():
            outputs = self.model.generate(
                input_ids,
                max_new_tokens=512,
                temperature=0.7,
                top_p=0.9,
                do_sample=True,
                pad_token_id=self.tokenizer.eos_token_id,
            )

        # Decode response (skip the input tokens)
        response = self.tokenizer.decode(
            outputs[0][input_ids.shape[1]:],
            skip_special_tokens=True
        )

        return response


# Web endpoint for API access
@app.function(image=image, timeout=300)
@modal.fastapi_endpoint(method="POST")
def chat(request: dict) -> dict:
    """
    HTTP endpoint for chat

    Request body:
    {
        "message": "Who is Fozan?",
        "history": []  // optional: list of [user_msg, assistant_msg] pairs
    }

    Response:
    {
        "response": "Fozan is a Full-Stack AI/LLM Engineer..."
    }
    """
    message = request.get("message", "")
    history = request.get("history", [])

    if not message:
        return {"error": "No message provided"}

    assistant = FozanAssistant()
    response = assistant.generate.remote(message, history)

    return {"response": response}


# For local testing
@app.local_entrypoint()
def main():
    """Test the model locally"""
    assistant = FozanAssistant()

    # Test questions
    test_questions = [
        "Who is Fozan?",
    ]

    for question in test_questions:
        print(f"\n{'='*50}")
        print(f"Q: {question}")
        print(f"{'='*50}")
        response = assistant.generate.remote(question)
        print(f"A: {response}")
