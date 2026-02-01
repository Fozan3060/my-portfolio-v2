# Fine-tuning Llama 3.1 8B for Fozan's Chatbot

## Overview

This directory contains everything needed to fine-tune Llama 3.1 8B on Fozan's portfolio data using QLoRA (4-bit quantization + LoRA adapters).

## Files

- `dataset.jsonl` - 55 Q&A pairs about Fozan (skills, projects, personal info)
- `train.py` - Training script using Unsloth
- `Modelfile` - Ollama model configuration
- `README.md` - This file

## Requirements

### Hardware
- **GPU:** NVIDIA RTX 4060 (8GB VRAM) or better
- **RAM:** 16GB+ recommended
- **Storage:** ~15GB free space

### Software
```bash
# Create virtual environment
python -m venv fine-tune-env
source fine-tune-env/bin/activate  # On Windows: fine-tune-env\Scripts\activate

# Install dependencies
pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
pip install --no-deps trl peft accelerate bitsandbytes
pip install datasets
```

## Training Steps

### 1. Prepare Environment
```bash
cd fine-tuning
source fine-tune-env/bin/activate
```

### 2. Run Training
```bash
python train.py
```

This will:
- Load Llama 3.1 8B in 4-bit quantization
- Add LoRA adapters
- Train on `dataset.jsonl` for 3 epochs
- Save the fine-tuned model to `./fozan-assistant-lora`

**Expected time:** 2-4 hours on RTX 4060

### 3. Convert to Ollama Format

After training completes:

```bash
# Create GGUF format (if needed)
python -c "
from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained('fozan-assistant-lora')
model.save_pretrained_gguf('fozan-assistant-gguf', tokenizer, quantization_method='q4_k_m')
"

# Or export to Hugging Face format for Ollama
python -c "
from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained('fozan-assistant-lora')
model.save_pretrained_merged('fozan-assistant-merged', tokenizer, save_method='merged_16bit')
"
```

### 4. Create Ollama Model

```bash
# Create Modelfile
cat > Modelfile << 'EOF'
FROM ./fozan-assistant-merged

PARAMETER temperature 0.7
PARAMETER top_p 0.9

SYSTEM """You are Fozan's AI assistant on his portfolio website. You help visitors learn about Fozan's skills, experience, and services. Be friendly, professional, and helpful."""
EOF

# Create Ollama model
ollama create fozan-assistant -f Modelfile

# Test it
ollama run fozan-assistant "Who is Fozan?"
```

### 5. Update Your App

Change the model in `.env.local`:
```bash
OLLAMA_MODEL=fozan-assistant  # Instead of llama3.1:8b
```

## Dataset Format

Each line in `dataset.jsonl` is a JSON object:
```json
{"instruction": "User question", "output": "AI response"}
```

### Adding More Data

To add more Q&A pairs, append to `dataset.jsonl`:
```bash
echo '{"instruction": "New question?", "output": "New answer"}' >> dataset.jsonl
```

Then retrain the model.

## Troubleshooting

### CUDA Out of Memory
- Reduce `per_device_train_batch_size` to 1
- Reduce `max_seq_length` to 1024

### Slow Training
- Make sure you're using the GPU (check `nvidia-smi`)
- Close other GPU-intensive applications

### Model Quality Issues
- Add more training examples
- Increase training epochs
- Adjust learning rate

## Expected Results

After fine-tuning:
- Model will "know" Fozan without needing system prompt
- More natural, consistent responses about Fozan
- Faster inference (no large system prompt to process)
