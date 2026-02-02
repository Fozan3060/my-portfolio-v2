# Fine-tuning Context File

Use this file to provide context to any AI assistant to continue the fine-tuning process.

---

## Project Overview

**Goal:** Fine-tune Llama 3.1 8B on Fozan's portfolio data to create a personalized AI chatbot.

**Current Status:**
- ✅ Phase 1: Basic chatbot with system prompt (COMPLETE)
- ✅ Dataset created (78 Q&A pairs)
- ✅ Training scripts ready (PC + Mac)
- ✅ PC Training: LoRA weights created on RTX 4060
- ✅ Mac Training: MLX LoRA weights created on M1 Pro
- ✅ MLX model fused
- ✅ Phase 2: Merging & GGUF conversion (COMPLETE)
- ✅ Ollama model created: `fozan-assistant`
- ✅ Phase 3: Modal production deployment (COMPLETE)

**Repository:** https://github.com/Fozan3060/my-portfolio-v2
**Branch:** `feature/fine-tuning`

---

## What Was Done (Complete Pipeline)

### Phase 1: Training

#### PC Training (RTX 4060)
- Used Unsloth + QLoRA (4-bit quantization)
- Trained on 78 Q&A pairs for 3 epochs
- Output: `models/pc-unsloth-lora/` (~160MB adapter)
- Time: ~30-60 minutes

#### Mac Training (M1 Pro)
- Used MLX + LoRA
- Trained on same dataset
- Output: `models/mac-mlx-lora/`
- Time: ~5-10 minutes

### Phase 2: Merging & Conversion

#### Why Merging Was Needed
```
LoRA Adapter (160MB) + Base Model (16GB) = Complete Fine-tuned Model
```
- LoRA only stores the "diff" from base model
- For inference, need to merge them together

#### Steps Completed
1. **Installed dependencies:**
   ```bash
   pip3 install peft transformers accelerate
   ```

2. **Merged LoRA with base model:**
   ```bash
   python3 merge_unsloth.py
   ```
   - Downloaded `unsloth/Meta-Llama-3.1-8B-Instruct` (~16GB)
   - Loaded LoRA adapter
   - Merged weights
   - Output: `models/merged-model/` (~16GB)

3. **Converted to GGUF for Ollama:**
   ```bash
   git clone https://github.com/ggerganov/llama.cpp ~/llama.cpp
   pip3 install gguf
   python3 ~/llama.cpp/convert_hf_to_gguf.py "./models/merged-model" \
     --outfile "./models/fozan-assistant.gguf" --outtype q8_0
   ```
   - Output: `models/fozan-assistant.gguf` (8.5GB, Q8_0 quantization)

4. **Created Ollama model:**
   ```bash
   ollama create fozan-assistant -f Modelfile.gguf
   ollama run fozan-assistant "Who is Fozan?"
   ```

5. **Updated app config:**
   - Changed `.env.local`: `OLLAMA_MODEL=fozan-assistant`

### Phase 3: Production Deployment (In Progress)

#### Why Not Cloudflare?
Initially planned to use Cloudflare Workers AI, but discovered:
- Cloudflare only supports their pre-built models
- **Cannot upload custom fine-tuned models**

#### Solution: Hugging Face Spaces with ZeroGPU
- **Free GPU inference** via ZeroGPU program
- **Supports custom models**
- API endpoint for portfolio

#### ZeroGPU Quota Limits
| Resource | Limit |
|----------|-------|
| GPU Hours | ~50 hours/month |
| GPU Type | NVIDIA A10G or T4 |
| Cold Start | 2-5 seconds |
| Concurrent | Shared |

#### Steps to Complete
1. Create Hugging Face account
2. Create access token (Write permission)
3. Login: `python3 -m huggingface_hub.commands.huggingface_cli login`
4. Upload: `python3 upload_to_huggingface.py`
5. Wait for Space to build
6. Update portfolio to use HF API

---

## File Structure

```
fine-tuning/
├── models/                          # Trained models (gitignored)
│   ├── pc-unsloth-lora/            # ✅ LoRA from PC
│   ├── mac-mlx-lora/               # ✅ LoRA from Mac
│   ├── fused-mlx-model/            # ✅ Fused MLX (4-bit)
│   ├── merged-model/               # ✅ Merged HF model (16GB)
│   └── fozan-assistant.gguf        # ✅ GGUF for Ollama (8.5GB)
├── huggingface-space/              # HF Space files
│   ├── app.py                      # Gradio app with ZeroGPU
│   ├── requirements.txt
│   └── README.md
├── data/                           # MLX training data
│   ├── train.jsonl
│   └── valid.jsonl
├── dataset.jsonl                   # 78 Q&A pairs
├── train.py                        # PC training (Unsloth)
├── train_mlx.py                    # Mac training (MLX)
├── merge_unsloth.py                # Merge LoRA + base model
├── fuse_mlx.py                     # Fuse MLX LoRA
├── convert_gguf.py                 # GGUF conversion helper
├── upload_to_huggingface.py        # Upload to HF
├── run_mlx_server.py               # Local MLX server
├── Modelfile.gguf                  # Ollama config
├── README.md                       # Full documentation
└── CONTEXT.md                      # This file
```

---

## Hardware Insights

### Fine-tuning vs Inference Memory

| Task | Memory Needed | Why |
|------|---------------|-----|
| Fine-tuning | ~3-4x model size | Model + gradients + optimizer |
| Inference | ~1x model size | Just model weights |

### Hardware Comparison

| Hardware | Fine-tuning (QLoRA) | Inference |
|----------|---------------------|-----------|
| RTX 4060 (8GB) | Up to 8B | Up to 8B |
| M1 Pro (32GB) | Up to 13B | Up to 70B (4-bit) |

**Key insight:**
- RTX 4060 = Better for training (CUDA, tensor cores)
- M1 Pro = Better for inference (more unified memory)

---

## Key Technical Concepts

### LoRA (Low-Rank Adaptation)
- Trains small "adapter" layers instead of full model
- Adapter size: ~160MB vs 16GB full model
- Same quality, much less compute

### QLoRA (Quantized LoRA)
- Base model loaded in 4-bit precision
- LoRA trained in 16-bit
- Fits 8B model in 8GB VRAM

### GGUF Format
- Optimized format for CPU/GPU inference
- Used by Ollama, llama.cpp
- Supports various quantization levels (Q4, Q8, etc.)

### ZeroGPU
- Hugging Face's free GPU sharing program
- On-demand GPU allocation
- "Zero" = zero cost, NOT zero GPU

---

## Key Information About Fozan

**Fozan Javaid**
- Full-Stack AI/LLM Engineer, 4+ years experience
- Based in Karachi, Pakistan
- Born April 2, 2004
- Student at FAST NUCE (Computer Science)
- Email: fozanjavaid111@gmail.com
- Phone: +92 332 2440974

**Tech Stack:**
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, FastAPI, GraphQL
- AI: LLM Integration, RAG, Multi-agent systems, Pinecone
- Cloud: AWS, Vercel, Docker

**Notable Projects:**
- Persona AI (HeyGen + Pinecone + Gemini)
- Career Coach AI (Multi-agent system)
- This portfolio chatbot (Llama 3.1 8B fine-tuned)

---

## Troubleshooting

### Merge script downloads 16GB every time
The base model is cached in `~/.cache/huggingface/`. First run downloads, subsequent runs use cache.

### MLX model can't convert to GGUF
MLX uses proprietary 4-bit format. Use `merge_unsloth.py` with PC LoRA instead.

### Hugging Face upload slow
Model is ~16GB. Use stable internet. Can take 30+ minutes.

### Space shows "Building" forever
Check Space logs. Common issues:
- Wrong Python version
- Missing dependencies
- OOM errors

---

## Completed Implementation

All phases are complete:
1. ✅ Fine-tuning on PC (Unsloth) and Mac (MLX)
2. ✅ Model merged and uploaded to HuggingFace
3. ✅ Modal deployment with A10G GPU and model caching
4. ✅ Portfolio integration with `src/lib/chat/modal.ts`
5. ✅ Vercel deployment with environment variables

**Production URLs:**
- Portfolio: https://my-portfolio-v2-two-phi.vercel.app
- Modal API: https://fozan3060--fozan-assistant-chat.modal.run
- HuggingFace Model: https://huggingface.co/fozan3060/fozan-assistant

The user (Fozan) is technically skilled and can follow terminal commands.
