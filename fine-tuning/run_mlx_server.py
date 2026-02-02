"""
Run MLX model server locally
This serves the fine-tuned model via HTTP API (compatible with OpenAI format)
"""

import subprocess
import sys

MODEL_PATH = "./models/fused-mlx-model"
PORT = 8080

def main():
    print("="*50)
    print("Starting Fozan Assistant MLX Server")
    print("="*50)
    print(f"\nModel: {MODEL_PATH}")
    print(f"Port: {PORT}")
    print(f"\nAPI endpoint: http://localhost:{PORT}/v1/chat/completions")
    print("\nTest with:")
    print(f'curl http://localhost:{PORT}/v1/chat/completions -H "Content-Type: application/json" -d \'{{"messages": [{{"role": "user", "content": "Who is Fozan?"}}]}}\'')
    print("\nPress Ctrl+C to stop\n")
    print("-"*50)

    cmd = [
        sys.executable, "-m", "mlx_lm", "server",
        "--model", MODEL_PATH,
        "--port", str(PORT),
    ]

    subprocess.run(cmd)

if __name__ == "__main__":
    main()
