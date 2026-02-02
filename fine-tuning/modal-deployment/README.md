# Modal Deployment for Fozan's AI Assistant

Deploy your fine-tuned Llama 3.1 8B model on Modal with **$30/month free credits**.

## Quick Start

### 1. Install Modal CLI

```bash
pip install modal
```

### 2. Create Modal Account & Authenticate

```bash
# This opens browser to create account / login
modal setup
```

### 3. Deploy the App

```bash
cd fine-tuning/modal-deployment
modal deploy app.py
```

### 4. Get Your API Endpoint

After deployment, Modal will show your endpoint URL:
```
https://fozan3060--fozan-assistant-chat.modal.run
```

---

## API Usage

### Basic Request

```bash
curl -X POST https://YOUR-MODAL-URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Who is Fozan?"}'
```

### With Conversation History

```bash
curl -X POST https://YOUR-MODAL-URL/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What else can you tell me?",
    "history": [
      ["Who is Fozan?", "Fozan is a Full-Stack AI/LLM Engineer..."]
    ]
  }'
```

### JavaScript/TypeScript

```typescript
const response = await fetch('https://YOUR-MODAL-URL/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Who is Fozan?',
    history: []
  })
});

const data = await response.json();
console.log(data.response);
```

---

## Local Testing

Test before deploying:

```bash
modal run app.py
```

---

## Cost Estimation

| Resource | Cost |
|----------|------|
| T4 GPU | ~$0.000164/sec |
| Average request | ~5-10 seconds |
| Cost per chat | ~$0.001-0.002 |
| **Monthly free** | **$30** |
| **Free chats/month** | **~15,000-30,000** |

---

## Commands Reference

```bash
# Deploy to Modal
modal deploy app.py

# Run locally for testing
modal run app.py

# View logs
modal app logs fozan-assistant

# Stop the app
modal app stop fozan-assistant

# Check deployment status
modal app list
```

---

## Updating the Model

If you retrain the model:
1. Upload new model to HuggingFace
2. Redeploy: `modal deploy app.py`

---

## Troubleshooting

### "Out of memory" error
Change GPU to A10G in app.py:
```python
@app.cls(gpu="A10G", ...)  # More VRAM, slightly more expensive
```

### Slow cold starts
Increase `container_idle_timeout` to keep containers warm longer:
```python
@app.cls(container_idle_timeout=300, ...)  # 5 minutes
```

### Rate limiting
Modal's free tier allows 10 concurrent GPU containers. For higher traffic, upgrade plan.

---

## Architecture

```
Portfolio Website
       │
       ▼
  /api/chat (Next.js)
       │
       ▼
  Modal Endpoint
  (https://...modal.run/chat)
       │
       ▼
  Serverless T4 GPU
  (scales 0 → N automatically)
       │
       ▼
  Fine-tuned Llama 3.1 8B
  (loaded from HuggingFace)
```
