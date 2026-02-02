"""
Merge Unsloth LoRA adapter with base model on Mac
Uses transformers + peft (works on Apple Silicon)
"""

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import os

# Paths
ADAPTER_PATH = "./models/pc-unsloth-lora"
# Use unsloth's ungated version (same model, no auth required)
BASE_MODEL = "unsloth/Meta-Llama-3.1-8B-Instruct"
OUTPUT_PATH = "./models/merged-model"

def main():
    print("="*50)
    print("Merging LoRA adapter with base model")
    print("="*50)

    # Check if adapter exists
    if not os.path.exists(ADAPTER_PATH):
        print(f"Error: Adapter not found at {ADAPTER_PATH}")
        print("Make sure you moved the folder from Desktop")
        return

    print(f"\nLoading base model: {BASE_MODEL}")
    print("This will download ~16GB on first run...")

    # Load base model
    base_model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL,
        torch_dtype=torch.float16,
        device_map="auto",
        trust_remote_code=True,
    )

    print("Loading tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)

    print(f"Loading LoRA adapter from {ADAPTER_PATH}...")
    model = PeftModel.from_pretrained(base_model, ADAPTER_PATH)

    print("Merging weights...")
    model = model.merge_and_unload()

    print(f"Saving merged model to {OUTPUT_PATH}...")
    model.save_pretrained(OUTPUT_PATH)
    tokenizer.save_pretrained(OUTPUT_PATH)

    print("\n" + "="*50)
    print("SUCCESS! Merged model saved to:", OUTPUT_PATH)
    print("="*50)
    print("\nNext steps:")
    print("1. Convert to GGUF using llama.cpp")
    print("2. Create Ollama model")

if __name__ == "__main__":
    main()
