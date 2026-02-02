"""
Fine-tune Llama 3.1 8B for Fozan's Portfolio Chatbot
Using MLX + LoRA for efficient training on Apple Silicon (M1 Pro)
"""

import json
import subprocess
import os
import sys
from pathlib import Path

# ============== Configuration ==============
MODEL_NAME = "mlx-community/Meta-Llama-3.1-8B-Instruct-4bit"
OUTPUT_DIR = "./fozan-assistant-mlx"
DATASET_FILE = "dataset.jsonl"

# Training parameters
EPOCHS = 3
BATCH_SIZE = 4  # M1 Pro 32GB can handle more
LEARNING_RATE = 1e-5
NUM_LAYERS = 16  # Number of layers to fine-tune

def convert_dataset():
    """Convert dataset.jsonl to MLX chat format"""
    print("Converting dataset to MLX format...")

    train_data = []

    with open(DATASET_FILE, 'r') as f:
        for line in f:
            item = json.loads(line)

            # MLX uses chat format
            conversation = {
                "messages": [
                    {
                        "role": "system",
                        "content": "You are Fozan's AI assistant on his portfolio website. You help visitors learn about Fozan's skills, experience, and services. Be friendly, professional, and helpful."
                    },
                    {
                        "role": "user",
                        "content": item["instruction"]
                    },
                    {
                        "role": "assistant",
                        "content": item["output"]
                    }
                ]
            }
            train_data.append(conversation)

    # Create data directory
    os.makedirs("data", exist_ok=True)

    # Split: 90% train, 10% validation
    split_idx = int(len(train_data) * 0.9)

    with open("data/train.jsonl", 'w') as f:
        for item in train_data[:split_idx]:
            f.write(json.dumps(item) + '\n')

    with open("data/valid.jsonl", 'w') as f:
        for item in train_data[split_idx:]:
            f.write(json.dumps(item) + '\n')

    print(f"Created data/train.jsonl ({split_idx} examples)")
    print(f"Created data/valid.jsonl ({len(train_data) - split_idx} examples)")

def main():
    print("="*50)
    print("MLX Fine-tuning for Fozan's Portfolio Chatbot")
    print("="*50)

    # Step 1: Convert dataset
    convert_dataset()

    # Step 2: Run fine-tuning using mlx_lm
    print("\nStarting fine-tuning with MLX...")
    print(f"Model: {MODEL_NAME}")
    print(f"Epochs: {EPOCHS}")
    print(f"Batch Size: {BATCH_SIZE}")
    print(f"Learning Rate: {LEARNING_RATE}")
    print(f"Num Layers: {NUM_LAYERS}")
    print("-"*50)

    cmd = [
        sys.executable, "-m", "mlx_lm", "lora",
        "--model", MODEL_NAME,
        "--train",
        "--data", "./data",
        "--batch-size", str(BATCH_SIZE),
        "--num-layers", str(NUM_LAYERS),
        "--iters", str(EPOCHS * 70 // BATCH_SIZE),  # Approximate iterations
        "--learning-rate", str(LEARNING_RATE),
        "--adapter-path", OUTPUT_DIR,
    ]

    print(f"Running: {' '.join(cmd)}\n")

    result = subprocess.run(cmd)

    if result.returncode == 0:
        print("\n" + "="*50)
        print("SUCCESS! LoRA adapter saved to:", OUTPUT_DIR)
        print("="*50)
        print("\nNext steps:")
        print("1. Fuse the adapter: python fuse_mlx.py")
        print("2. Convert to GGUF: python convert_gguf.py")
        print("3. Create Ollama model: ollama create fozan-assistant -f Modelfile")
        print("4. Test: ollama run fozan-assistant 'Who is Fozan?'")
    else:
        print("\nTraining failed. Check errors above.")

if __name__ == "__main__":
    main()
