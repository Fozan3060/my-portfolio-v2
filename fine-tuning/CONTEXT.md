# Fine-tuning Context File

Use this file to provide context to any AI assistant to continue the fine-tuning process.

---

## Project Overview

**Goal:** Fine-tune Llama 3.1 8B on Fozan's portfolio data to create a personalized AI chatbot.

**Current Status:**
- ✅ Phase 1: Basic chatbot with system prompt (COMPLETE)
- ✅ Dataset created (78 Q&A pairs)
- ✅ Training scripts ready
- 🔄 Phase 2: Fine-tuning (IN PROGRESS - need to run on RTX 4060)
- ⏳ Phase 3: Production deployment to Cloudflare (PENDING)

**Repository:** https://github.com/Fozan3060/my-portfolio-v2
**Branch:** `feature/fine-tuning`

---

## What's Been Done

### 1. AI Chatbot Implementation (Phase 1)
- Built a floating chatbot widget in Next.js
- Integrated with Ollama (local) and Cloudflare Workers AI (production)
- Created provider abstraction pattern
- Streaming responses via Server-Sent Events
- UI matches portfolio dark theme with orange accent (#ff9776)

### 2. Fine-tuning Setup (Phase 2)
Created the following files in `/fine-tuning/`:

| File | Purpose |
|------|---------|
| `dataset.jsonl` | 78 Q&A pairs about Fozan |
| `train.py` | Training script using Unsloth + QLoRA |
| `Modelfile` | Ollama configuration for custom model |
| `README.md` | Detailed instructions |

### 3. Dataset Contents
The dataset covers:
- Professional info (skills, services, 4+ years experience)
- Work history (Freelancer, OnlyGamers Norway, Creative Squad Canada)
- Projects (Persona AI, Career Coach AI, Merchantra, DayOf, ShoutOut)
- Personal (born April 2 2004, gaming, fast food, NVIDIA/Apple fan)
- Education (FAST NUCE, self-taught via Udemy)
- Contact info and hiring questions
- Casual conversations and greetings

---

## Current Task: Run Fine-tuning on RTX 4060

### Hardware
- PC with NVIDIA RTX 4060 (8GB VRAM)
- Windows or Linux

### Steps to Complete

#### 1. Clone and Setup
```bash
git clone https://github.com/Fozan3060/my-portfolio-v2.git
cd my-portfolio-v2
git checkout feature/fine-tuning
cd fine-tuning
```

#### 2. Create Python Environment
```bash
python -m venv fine-tune-env

# Windows:
fine-tune-env\Scripts\activate

# Linux:
source fine-tune-env/bin/activate
```

#### 3. Install Dependencies
```bash
# PyTorch with CUDA
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Unsloth (fast fine-tuning library)
pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"

# Other dependencies
pip install --no-deps trl peft accelerate bitsandbytes
pip install datasets
```

#### 4. Verify GPU
```bash
python -c "import torch; print(f'CUDA: {torch.cuda.is_available()}'); print(f'GPU: {torch.cuda.get_device_name(0)}')"
```

#### 5. Run Training
```bash
python train.py
```

**Expected:**
- Duration: 2-4 hours
- Output folder: `fozan-assistant-lora/`

#### 6. Export Model
```bash
python -c "
from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained('fozan-assistant-lora')
model.save_pretrained_merged('fozan-assistant-merged', tokenizer, save_method='merged_16bit')
print('Done!')
"
```

#### 7. Transfer to Mac
Copy `fozan-assistant-merged/` folder to Mac via:
- USB drive
- Cloud storage (Google Drive, Dropbox)
- Network transfer

#### 8. On Mac - Create Ollama Model
```bash
cd my-portfolio-v2/fine-tuning
# (after copying fozan-assistant-merged/ here)
ollama create fozan-assistant -f Modelfile
ollama run fozan-assistant "Who is Fozan?"
```

#### 9. Update App
```bash
# In .env.local change:
OLLAMA_MODEL=fozan-assistant
```

---

## Troubleshooting

### CUDA Out of Memory
Edit `train.py`:
```python
BATCH_SIZE = 1  # Change from 2
```

### Unsloth Install Issues
```bash
pip install ninja packaging
pip install flash-attn --no-build-isolation
```

### Verify Training is Using GPU
```bash
nvidia-smi  # Should show python using GPU memory
```

---

## After Fine-tuning Complete

### Next Steps (Phase 3)
1. Test fine-tuned model locally
2. Set up Cloudflare Workers AI account
3. Add Cloudflare credentials to Vercel
4. Deploy to production
5. Merge branches to main

### Production Environment Variables Needed
```
CLOUDFLARE_ACCOUNT_ID=<your_account_id>
CLOUDFLARE_API_TOKEN=<your_api_token>
```

---

## Key Information About Fozan

For any AI helping with this project, here's the context:

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

**Services:**
- AI/LLM Integration
- RAG Systems
- AI Chatbots
- Full-Stack Development
- Payment Integration (Stripe)

**Notable Projects:**
- Persona AI (HeyGen + Pinecone + Gemini)
- Career Coach AI (Multi-agent system)
- This portfolio chatbot (Llama 3.1 8B)

---

## File Structure

```
my-portfolio-v2/
├── fine-tuning/
│   ├── dataset.jsonl      # 78 Q&A training pairs
│   ├── train.py           # Unsloth training script
│   ├── Modelfile          # Ollama config
│   ├── README.md          # Instructions
│   └── CONTEXT.md         # This file
├── src/
│   ├── app/api/chat/      # Streaming API route
│   ├── components/        # Chat UI components
│   ├── hooks/useChat.ts   # Chat state management
│   └── lib/chat/          # Providers + system prompt
└── docs/
    └── CHATBOT_IMPLEMENTATION_PLAN.md
```

---

## Questions for AI Assistant

If you're an AI helping continue this project, you might need to:

1. Help troubleshoot training issues
2. Adjust training parameters if OOM errors
3. Help with model export/conversion
4. Assist with Ollama model creation
5. Help set up Cloudflare production deployment

The user (Fozan) is technically skilled and can follow terminal commands.
