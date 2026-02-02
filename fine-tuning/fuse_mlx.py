"""
Fuse LoRA adapter with base model and convert to GGUF for Ollama
"""

import subprocess
import os
import sys

MODEL_NAME = "mlx-community/Meta-Llama-3.1-8B-Instruct-4bit"
ADAPTER_PATH = "./models/mac-mlx-lora"
FUSED_PATH = "./models/fused-mlx-model"

def main():
    print("="*50)
    print("Fusing LoRA adapter with base model")
    print("="*50)

    # Fuse adapter
    cmd = [
        sys.executable, "-m", "mlx_lm", "fuse",
        "--model", MODEL_NAME,
        "--adapter-path", ADAPTER_PATH,
        "--save-path", FUSED_PATH,
    ]

    print(f"Running: {' '.join(cmd)}\n")
    result = subprocess.run(cmd)

    if result.returncode == 0:
        print("\n" + "="*50)
        print("SUCCESS! Fused model saved to:", FUSED_PATH)
        print("="*50)
        print("\nNext step: Convert to GGUF format")
        print("python convert_gguf.py")
    else:
        print("\nFusion failed. Check errors above.")

if __name__ == "__main__":
    main()
