"""
Upload fine-tuned model and Space to Hugging Face
Run this after logging in with: python3 -m huggingface_hub.commands.huggingface_cli login
"""

from huggingface_hub import HfApi, create_repo, upload_folder
import os

# Configuration
HF_USERNAME = "fozan3060"  # Your Hugging Face username
MODEL_REPO = f"{HF_USERNAME}/fozan-assistant"
SPACE_REPO = f"{HF_USERNAME}/fozan-assistant-chat"

MODEL_PATH = "./models/merged-model"
SPACE_PATH = "./huggingface-space"

def main():
    api = HfApi()

    print("="*50)
    print("Uploading to Hugging Face")
    print("="*50)

    # Step 1: Create and upload model repository
    print(f"\n1. Creating model repo: {MODEL_REPO}")
    try:
        create_repo(MODEL_REPO, repo_type="model", exist_ok=True)
        print(f"   ✓ Repo created/exists: https://huggingface.co/{MODEL_REPO}")
    except Exception as e:
        print(f"   Error creating repo: {e}")
        return

    print(f"\n2. Uploading model files (this may take a while)...")
    try:
        upload_folder(
            folder_path=MODEL_PATH,
            repo_id=MODEL_REPO,
            repo_type="model",
            commit_message="Upload fine-tuned Fozan Assistant model",
        )
        print(f"   ✓ Model uploaded: https://huggingface.co/{MODEL_REPO}")
    except Exception as e:
        print(f"   Error uploading model: {e}")
        return

    # Step 2: Create and upload Space
    print(f"\n3. Creating Space: {SPACE_REPO}")
    try:
        create_repo(
            SPACE_REPO,
            repo_type="space",
            space_sdk="gradio",
            exist_ok=True
        )
        print(f"   ✓ Space created: https://huggingface.co/spaces/{SPACE_REPO}")
    except Exception as e:
        print(f"   Error creating space: {e}")
        return

    # Update app.py to use correct model path
    app_py_path = os.path.join(SPACE_PATH, "app.py")
    with open(app_py_path, 'r') as f:
        content = f.read()
    content = content.replace("Fozan3060/fozan-assistant", MODEL_REPO)
    with open(app_py_path, 'w') as f:
        f.write(content)

    print(f"\n4. Uploading Space files...")
    try:
        upload_folder(
            folder_path=SPACE_PATH,
            repo_id=SPACE_REPO,
            repo_type="space",
            commit_message="Upload Fozan Assistant chat interface",
        )
        print(f"   ✓ Space uploaded: https://huggingface.co/spaces/{SPACE_REPO}")
    except Exception as e:
        print(f"   Error uploading space: {e}")
        return

    print("\n" + "="*50)
    print("SUCCESS!")
    print("="*50)
    print(f"\nModel: https://huggingface.co/{MODEL_REPO}")
    print(f"Space: https://huggingface.co/spaces/{SPACE_REPO}")
    print(f"\nThe Space will take a few minutes to build.")
    print(f"Once ready, you can use the API in your portfolio.")

if __name__ == "__main__":
    main()
