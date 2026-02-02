"""
Convert fused MLX model to GGUF format for Ollama

Note: This requires llama.cpp's convert script.
If you don't have it, follow these steps:

1. Clone llama.cpp:
   git clone https://github.com/ggerganov/llama.cpp
   cd llama.cpp
   pip install -r requirements.txt

2. Then run this script with the path to llama.cpp
"""

import subprocess
import os
import sys
from pathlib import Path

FUSED_PATH = "./models/fused-mlx-model"
GGUF_OUTPUT = "./models/fozan-assistant.gguf"

def find_llama_cpp():
    """Try to find llama.cpp installation"""
    possible_paths = [
        os.path.expanduser("~/llama.cpp"),
        os.path.expanduser("~/Projects/llama.cpp"),
        "/opt/llama.cpp",
        "../llama.cpp",
    ]

    for path in possible_paths:
        convert_script = Path(path) / "convert_hf_to_gguf.py"
        if convert_script.exists():
            return path

    return None

def main():
    print("="*50)
    print("Converting to GGUF format for Ollama")
    print("="*50)

    # Check if fused model exists
    if not os.path.exists(FUSED_PATH):
        print(f"Error: Fused model not found at {FUSED_PATH}")
        print("Run fuse_mlx.py first!")
        sys.exit(1)

    # Find llama.cpp
    llama_cpp_path = find_llama_cpp()

    if llama_cpp_path is None:
        print("\nllama.cpp not found!")
        print("\nTo convert to GGUF, you need llama.cpp:")
        print("  git clone https://github.com/ggerganov/llama.cpp")
        print("  cd llama.cpp")
        print("  pip install -r requirements.txt")
        print(f"\nThen run:")
        print(f"  python llama.cpp/convert_hf_to_gguf.py {FUSED_PATH} --outfile {GGUF_OUTPUT} --outtype q8_0")
        sys.exit(1)

    convert_script = Path(llama_cpp_path) / "convert_hf_to_gguf.py"

    cmd = [
        sys.executable, str(convert_script),
        FUSED_PATH,
        "--outfile", GGUF_OUTPUT,
        "--outtype", "q8_0"  # 8-bit quantization, good balance
    ]

    print(f"Running: {' '.join(cmd)}\n")
    result = subprocess.run(cmd)

    if result.returncode == 0:
        print("\n" + "="*50)
        print("SUCCESS! GGUF model saved to:", GGUF_OUTPUT)
        print("="*50)
        print("\nNext steps:")
        print("1. Update Modelfile to point to the GGUF file")
        print("2. Create Ollama model: ollama create fozan-assistant -f Modelfile")
        print("3. Test: ollama run fozan-assistant 'Who is Fozan?'")
    else:
        print("\nConversion failed. Check errors above.")

if __name__ == "__main__":
    main()
