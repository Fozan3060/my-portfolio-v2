import gradio as gr
import spaces
from transformers import AutoModelForCausalLM, AutoTokenizer, TextIteratorStreamer
import torch
from threading import Thread

# Model will be loaded from the same Space repo
MODEL_ID = "fozan3060/fozan-assistant"

SYSTEM_PROMPT = """You are Fozan's AI assistant on his portfolio website. You help visitors learn about Fozan's skills, experience, and services. Be friendly, professional, and helpful. Keep responses concise but informative."""

# Global variables for model and tokenizer
model = None
tokenizer = None

def load_model():
    global model, tokenizer
    if model is None:
        tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
        model = AutoModelForCausalLM.from_pretrained(
            MODEL_ID,
            torch_dtype=torch.float16,
            device_map="auto",
        )
    return model, tokenizer

@spaces.GPU
def chat(message, history):
    """Chat function with GPU acceleration via ZeroGPU"""
    model, tokenizer = load_model()

    # Build conversation
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for user_msg, assistant_msg in history:
        messages.append({"role": "user", "content": user_msg})
        messages.append({"role": "assistant", "content": assistant_msg})
    messages.append({"role": "user", "content": message})

    # Tokenize
    input_ids = tokenizer.apply_chat_template(
        messages,
        return_tensors="pt",
        add_generation_prompt=True
    ).to(model.device)

    # Stream generation
    streamer = TextIteratorStreamer(tokenizer, skip_prompt=True, skip_special_tokens=True)

    generation_kwargs = dict(
        input_ids=input_ids,
        max_new_tokens=512,
        temperature=0.7,
        top_p=0.9,
        do_sample=True,
        streamer=streamer,
    )

    thread = Thread(target=model.generate, kwargs=generation_kwargs)
    thread.start()

    response = ""
    for token in streamer:
        response += token
        yield response

# Create Gradio interface
demo = gr.ChatInterface(
    fn=chat,
    title="Fozan's AI Assistant",
    description="Ask me anything about Fozan's skills, experience, projects, or services!",
    examples=[
        "Who is Fozan?",
        "What are Fozan's skills?",
        "What projects has Fozan worked on?",
        "How can I contact Fozan?",
    ],
    cache_examples=False,  # Disable caching - ZeroGPU only available during requests
    theme=gr.themes.Soft(),
)

# Launch with API enabled
if __name__ == "__main__":
    demo.launch()
