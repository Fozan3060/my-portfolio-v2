---
title: Fozan Assistant
emoji: 🤖
colorFrom: yellow
colorTo: gray
sdk: gradio
sdk_version: 4.44.0
python_version: "3.10"
app_file: app.py
pinned: false
license: mit
hardware: zero-a10g
---

# Fozan's AI Assistant

A fine-tuned Llama 3.1 8B model that knows about Fozan Javaid - a Full-Stack AI/LLM Engineer.

## Features
- Fine-tuned on 78 Q&A pairs about Fozan
- Knows about skills, projects, experience, and services
- Streaming responses
- ZeroGPU acceleration

## API Usage

```python
from gradio_client import Client

client = Client("Fozan3060/fozan-assistant")
result = client.predict(
    message="Who is Fozan?",
    api_name="/chat"
)
print(result)
```

## Built by
Fozan Javaid - Full-Stack AI/LLM Engineer
