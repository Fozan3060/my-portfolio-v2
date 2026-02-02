"""
Fine-tune Llama 3.1 8B for Fozan's Portfolio Chatbot
Using Unsloth + QLoRA for efficient training on RTX 4060 (8GB VRAM)
"""

from unsloth import FastLanguageModel
from datasets import load_dataset
from trl import SFTTrainer
from transformers import TrainingArguments
import torch

# ============== Configuration ==============
MODEL_NAME = "unsloth/Meta-Llama-3.1-8B-Instruct-bnb-4bit"
MAX_SEQ_LENGTH = 2048
LOAD_IN_4BIT = True
OUTPUT_DIR = "./fozan-assistant-lora"

# Training parameters
EPOCHS = 3
BATCH_SIZE = 2  # Reduce to 1 if OOM
GRADIENT_ACCUMULATION = 4
LEARNING_RATE = 2e-4
WARMUP_STEPS = 5

# LoRA parameters
LORA_R = 16
LORA_ALPHA = 16
LORA_DROPOUT = 0

# ============== Load Model ==============
print("Loading model...")
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name=MODEL_NAME,
    max_seq_length=MAX_SEQ_LENGTH,
    dtype=None,  # Auto-detect
    load_in_4bit=LOAD_IN_4BIT,
)

# ============== Add LoRA Adapters ==============
print("Adding LoRA adapters...")
model = FastLanguageModel.get_peft_model(
    model,
    r=LORA_R,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_alpha=LORA_ALPHA,
    lora_dropout=LORA_DROPOUT,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=3407,
    use_rslora=False,
    loftq_config=None,
)

# ============== Prepare Dataset ==============
print("Loading dataset...")

# Llama 3.1 Instruct format
def format_prompt(example):
    return {
        "text": f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>

You are Fozan's AI assistant on his portfolio website. You help visitors learn about Fozan's skills, experience, and services. Be friendly, professional, and helpful.<|eot_id|><|start_header_id|>user<|end_header_id|>

{example['instruction']}<|eot_id|><|start_header_id|>assistant<|end_header_id|>

{example['output']}<|eot_id|>"""
    }

# Load and format dataset
dataset = load_dataset("json", data_files="dataset.jsonl", split="train")
dataset = dataset.map(format_prompt)

print(f"Dataset size: {len(dataset)} examples")
print(f"Sample:\n{dataset[0]['text'][:500]}...")

# ============== Training ==============
print("Starting training...")

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=MAX_SEQ_LENGTH,
    dataset_num_proc=2,
    packing=False,
    args=TrainingArguments(
        output_dir=OUTPUT_DIR,
        per_device_train_batch_size=BATCH_SIZE,
        gradient_accumulation_steps=GRADIENT_ACCUMULATION,
        warmup_steps=WARMUP_STEPS,
        num_train_epochs=EPOCHS,
        learning_rate=LEARNING_RATE,
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=1,
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="linear",
        seed=3407,
        save_strategy="epoch",
    ),
)

# Show GPU stats before training
gpu_stats = torch.cuda.get_device_properties(0)
print(f"GPU: {gpu_stats.name}")
print(f"VRAM: {gpu_stats.total_memory / 1024**3:.1f} GB")

# Train!
trainer_stats = trainer.train()

# ============== Save Model ==============
print(f"\nTraining complete!")
print(f"Training time: {trainer_stats.metrics['train_runtime'] / 60:.1f} minutes")
print(f"Saving model to {OUTPUT_DIR}...")

model.save_pretrained(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)

print("\n" + "="*50)
print("SUCCESS! Model saved to:", OUTPUT_DIR)
print("="*50)
print("\nNext steps:")
print("1. Convert to Ollama format (see README.md)")
print("2. Create Ollama model: ollama create fozan-assistant -f Modelfile")
print("3. Update .env.local: OLLAMA_MODEL=fozan-assistant")
print("4. Test: ollama run fozan-assistant 'Who is Fozan?'")
