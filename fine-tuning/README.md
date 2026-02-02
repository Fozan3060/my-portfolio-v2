# Fine-tuning Llama 3.1 8B for Fozan's Chatbot

## Overview

This directory contains everything needed to fine-tune Llama 3.1 8B on Fozan's portfolio data using QLoRA (4-bit quantization + LoRA adapters).

**Training Options:**
- **PC (NVIDIA GPU):** Unsloth + QLoRA (fastest)
- **Mac (Apple Silicon):** MLX + LoRA

**Deployment Options:**
- **Local:** Ollama (development) - uses your GPU
- **Production:** Modal (serverless GPU) - $30/month free credits

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Portfolio Website (Next.js on Vercel)              │
│  └── ChatBot Component                              │
│      └── /api/chat (streaming)                      │
└──────────────────┬──────────────────────────────────┘
                   │
     ┌─────────────┴─────────────┐
     ▼                           ▼
┌─────────────┐         ┌──────────────────────┐
│ Ollama      │         │ Modal                │
│ (local dev) │         │ A10G GPU (production)│
│ Your GPU    │         │ $30/month free       │
└─────────────┘         └──────────────────────┘
```

---

## Folder Structure

```
fine-tuning/
├── models/                          # Trained models (gitignored)
│   ├── pc-unsloth-lora/            # LoRA weights from PC (Unsloth)
│   ├── mac-mlx-lora/               # LoRA weights from Mac (MLX)
│   ├── fused-mlx-model/            # Fused MLX model (4-bit)
│   ├── merged-model/               # Merged HF model (16-bit, ~16GB)
│   └── fozan-assistant.gguf        # GGUF for Ollama (8.5GB)
├── modal-deployment/               # Modal serverless deployment
│   ├── app.py                      # Modal app with A10G GPU
│   └── README.md                   # Modal setup instructions
├── huggingface-space/              # HuggingFace Space files (alternative)
│   ├── app.py                      # Gradio app
│   ├── requirements.txt
│   └── README.md
├── data/                           # MLX training data
│   ├── train.jsonl                 # 70 examples
│   └── valid.jsonl                 # 8 examples
├── dataset.jsonl                   # 78 Q&A pairs (source)
├── train.py                        # PC training script (Unsloth)
├── train_mlx.py                    # Mac training script (MLX)
├── merge_unsloth.py                # Merge PC LoRA with base model
├── fuse_mlx.py                     # Fuse Mac MLX LoRA
├── convert_gguf.py                 # Convert to GGUF helper
├── upload_to_huggingface.py        # Upload model to HuggingFace
├── run_mlx_server.py               # Run MLX model server (alternative)
├── Modelfile                       # Ollama config (merged model)
├── Modelfile.gguf                  # Ollama config (GGUF)
├── README.md                       # This file
└── CONTEXT.md                      # Context for AI assistants
```

---

## Dataset

**File:** `dataset.jsonl` - 78 Q&A pairs covering:
- Professional info (4+ years experience, skills, services)
- Work history (Freelancer, OnlyGamers Norway, Creative Squad Canada)
- Projects (Persona AI, Career Coach AI, Merchantra, DayOf, ShoutOut)
- Personal (born April 2 2004, gaming, fast food, NVIDIA/Apple fan)
- Education (FAST NUCE, self-taught via Udemy)
- Contact info and hiring questions
- Casual conversations and greetings

### Format
```json
{"instruction": "User question", "output": "AI response"}
```

---

## Complete Pipeline (What We Did)

### Phase 1: Training

#### Option A: Train on PC (NVIDIA GPU) ✅ Completed

**Requirements:**
- NVIDIA RTX 4060 (8GB VRAM) or better
- Windows with WSL2 Ubuntu, or Linux
- ~20GB storage

**Steps:**
```bash
# 1. Setup WSL2 Ubuntu environment
sudo apt update && sudo apt install python3 python3-pip python3-venv git -y

# 2. Clone and setup
git clone https://github.com/Fozan3060/my-portfolio-v2.git
cd my-portfolio-v2/fine-tuning
python3 -m venv fine-tune-env
source fine-tune-env/bin/activate

# 3. Install dependencies
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
pip install --no-deps trl peft accelerate bitsandbytes
pip install datasets

# 4. Train (30-60 min on RTX 4060)
python train.py
# Output: fozan-assistant-lora/
```

#### Option B: Train on Mac (Apple Silicon) ✅ Completed

**Requirements:**
- Mac M1/M2/M3 with 16GB+ RAM
- ~10GB storage

**Steps:**
```bash
# 1. Install dependencies
pip3 install mlx mlx-lm

# 2. Train (5-10 min on M1 Pro)
python3 train_mlx.py
# Output: models/mac-mlx-lora/

# 3. Fuse model
python3 fuse_mlx.py
# Output: models/fused-mlx-model/
```

---

### Phase 2: Merging & Conversion ✅ Completed

The LoRA adapter must be merged with the base model for deployment.

#### Why Merging is Needed
- LoRA = small adapter (~160MB) that modifies base model behavior
- For inference, we need: Base Model + LoRA = Complete Model
- Merged model can be converted to GGUF for Ollama

#### Merge PC LoRA with Base Model
```bash
# Install dependencies
pip3 install peft transformers accelerate

# Merge (downloads ~16GB base model)
python3 merge_unsloth.py
# Output: models/merged-model/ (~16GB)
```

**What happens:**
1. Downloads `unsloth/Meta-Llama-3.1-8B-Instruct` base model (~16GB)
2. Loads LoRA adapter from `models/pc-unsloth-lora/`
3. Merges weights: `merged = base + lora`
4. Saves complete model to `models/merged-model/`

#### Convert to GGUF for Ollama
```bash
# Clone llama.cpp (if not done)
git clone https://github.com/ggerganov/llama.cpp ~/llama.cpp
pip3 install gguf

# Convert to GGUF Q8_0 quantization
python3 ~/llama.cpp/convert_hf_to_gguf.py "./models/merged-model" \
  --outfile "./models/fozan-assistant.gguf" --outtype q8_0
# Output: models/fozan-assistant.gguf (8.5GB)
```

**Quantization Options:**
| Type | Size | Quality | Speed |
|------|------|---------|-------|
| Q8_0 | 8.5GB | Best | Slower |
| Q4_K_M | 4.5GB | Good | Faster |
| Q4_0 | 4GB | OK | Fastest |

#### Create Ollama Model
```bash
ollama create fozan-assistant -f Modelfile.gguf
ollama run fozan-assistant "Who is Fozan?"
```

---

### Phase 3: Production Deployment (Modal) ✅ Completed

#### Why Modal?
- **$30/month free credits** (recurring monthly)
- Serverless GPU (A10G) - scales to zero when idle
- Fast cold starts with model caching
- Simple Python deployment
- No server management

#### Modal Free Tier Limits
| Resource | Limit |
|----------|-------|
| Monthly Credits | $30 |
| GPU Options | T4, A10G, A100, H100 |
| Scaledown | Configurable (10 min default) |
| Concurrent | 10 GPU containers |

#### Response Times
| Scenario | Time |
|----------|------|
| Cold start (first time) | ~1-2 min |
| Cold start (model cached) | ~20-30 sec |
| Warm request | ~5-10 sec |

#### Setup Steps

**1. Install Modal CLI**
```bash
pip install modal
```

**2. Create Account & Authenticate**
```bash
modal setup
# Opens browser to create account/login
```

**3. Deploy**
```bash
cd fine-tuning/modal-deployment
modal deploy app.py
```

**4. Get Your Endpoint**
After deployment, Modal shows your URL:
```
https://YOUR_USERNAME--fozan-assistant-chat.modal.run
```

**5. Add Environment Variables to Vercel**
```bash
vercel env add MODAL_ENDPOINT production
# Enter: https://YOUR_USERNAME--fozan-assistant-chat.modal.run

vercel env add USE_MODAL_AI production
# Enter: true
```

**6. Redeploy Portfolio**
```bash
vercel --prod
```

#### Alternative: HuggingFace Spaces
HuggingFace Spaces with ZeroGPU requires a PRO subscription ($9/month).
Files are in `huggingface-space/` if you prefer that option.

---

## Local Development

### Using Ollama (Recommended for Dev)
```bash
# Make sure Ollama is running
ollama run fozan-assistant "Who is Fozan?"

# In .env.local
OLLAMA_MODEL=fozan-assistant
```

### Using MLX Server (Alternative)
```bash
python3 run_mlx_server.py
# API at http://localhost:8080/v1/chat/completions
```

---

## Hardware Comparison

### Fine-tuning Memory Requirements
| Hardware | Max Model (QLoRA) | Max Model (Full) |
|----------|-------------------|------------------|
| RTX 4060 (8GB) | ~8B | ~3B |
| M1 Pro (32GB) | ~13B | ~7B |

### Inference Capabilities
| Hardware | Max Model | Tokens/sec |
|----------|-----------|------------|
| RTX 4060 (8GB) | ~8B | 40-60 |
| M1 Pro (32GB) | ~70B (4-bit) | 20-35 |

**Key Insight:**
- RTX 4060 → Better for training (CUDA optimized)
- M1 Pro → Better for inference (more memory for larger models)

---

## Troubleshooting

### Merge Script Hangs
The base model download is ~16GB. Check your internet connection.

### GGUF Conversion Fails on MLX Model
MLX fused models are 4-bit quantized and incompatible with llama.cpp converter.
Solution: Use `merge_unsloth.py` with the PC-trained LoRA instead.

### Ollama Model Creation Fails
Ensure the path in `Modelfile.gguf` points to the actual .gguf file:
```
FROM ./models/fozan-assistant.gguf
```

### Hugging Face Upload Fails
- Check you're logged in: `python3 -c "from huggingface_hub import whoami; print(whoami())"`
- Ensure token has "Write" permission
- Check internet connection (uploading ~16GB)

### Space Won't Start
- Check logs in Space settings
- Ensure `requirements.txt` has correct versions
- ZeroGPU requires `@spaces.GPU` decorator

---

## Adding More Training Data

1. Add Q&A pairs to `dataset.jsonl`:
```bash
echo '{"instruction": "New question?", "output": "New answer"}' >> dataset.jsonl
```

2. Retrain:
```bash
python3 train.py  # PC
# or
python3 train_mlx.py  # Mac
```

3. Re-merge and re-upload.

---

## Files Summary

| File | Purpose |
|------|---------|
| `dataset.jsonl` | 78 Q&A training pairs |
| `train.py` | PC training (Unsloth + QLoRA) |
| `train_mlx.py` | Mac training (MLX + LoRA) |
| `merge_unsloth.py` | Merge LoRA with base model |
| `fuse_mlx.py` | Fuse MLX LoRA adapter |
| `convert_gguf.py` | Helper for GGUF conversion |
| `upload_to_huggingface.py` | Upload model to HuggingFace |
| `run_mlx_server.py` | Local MLX inference server |
| `Modelfile.gguf` | Ollama model config |
| `modal-deployment/app.py` | Modal serverless deployment |

---

## Portfolio Integration

The portfolio uses these providers:

| Environment | Provider | GPU |
|-------------|----------|-----|
| Local (`npm run dev`) | Ollama | Your Mac/PC GPU |
| Production (Vercel) | Modal | A10G (cloud) |

**Environment Variables:**
```bash
# .env.local (local development)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=fozan-assistant
USE_MODAL_AI=false  # Use local GPU

# Vercel (production)
MODAL_ENDPOINT=https://fozan3060--fozan-assistant-chat.modal.run
USE_MODAL_AI=true
```

---

## Credits

- **Model:** Meta Llama 3.1 8B Instruct
- **Training:** Unsloth (PC), MLX (Mac)
- **Inference:** Ollama (local), Modal (production)
- **Built by:** Fozan Javaid - Full-Stack AI/LLM Engineer
