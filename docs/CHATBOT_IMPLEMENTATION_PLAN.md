# AI Chatbot Implementation Plan

## Status

| Phase | Description | Status |
|-------|-------------|--------|
| **Phase 1** | Basic chatbot with system prompt | ✅ **COMPLETE** |
| **Phase 2** | Fine-tuning with custom dataset | 🔜 Planned |

---

## Project Goal
Add a self-hosted AI chatbot to your portfolio that answers questions about your skills, projects, and services. This showcases advanced LLM deployment skills beyond just using an API.

---

## Technology Choices

| Component | Local Development | Production |
|-----------|-------------------|------------|
| **LLM** | Llama 3.1 8B | Llama 3.1 8B |
| **Runtime** | Ollama (your M1 Mac) | Cloudflare Workers AI |
| **Cost** | Free | Free (10k requests/day) |
| **Latency** | ~30-50 tokens/sec | Fast (edge GPUs) |

### Why This Stack?
- **Same model** in dev and prod = consistent behavior
- **Cloudflare Workers AI** = free tier with real GPU inference (not CPU)
- **No cold starts** unlike serverless GPU options
- **Streaming support** = real-time typing effect

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Portfolio (Next.js)                  │
│                                                              │
│  ┌─────────────────┐     ┌─────────────────────────────┐    │
│  │   ChatBot UI    │────▶│    /api/chat (streaming)    │    │
│  │  (Floating FAB) │     │                             │    │
│  └─────────────────┘     └──────────────┬──────────────┘    │
│                                         │                    │
└─────────────────────────────────────────┼────────────────────┘
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    │         Provider Abstraction Layer         │
                    │  (auto-switches based on NODE_ENV)         │
                    └─────────────────────┬─────────────────────┘
                                          │
              ┌───────────────────────────┼───────────────────────────┐
              │                           │                           │
              ▼                           ▼                           │
    ┌─────────────────┐         ┌─────────────────┐                   │
    │     Ollama      │         │   Cloudflare    │                   │
    │  localhost:11434│         │   Workers AI    │                   │
    │   (your Mac)    │         │  (edge GPUs)    │                   │
    └─────────────────┘         └─────────────────┘                   │
         DEV ONLY                  PRODUCTION                          │
```

---

## File Structure

```
src/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts              # POST endpoint (streaming SSE)
│
├── components/
│   ├── complex/
│   │   └── ChatBot.tsx               # Main container component
│   │
│   └── compound/
│       ├── ChatToggleButton.tsx      # Floating button (bottom-right)
│       ├── ChatWindow.tsx            # Chat dialog container
│       ├── ChatMessage.tsx           # Individual message bubble
│       ├── ChatInput.tsx             # Text input + send button
│       └── ChatTypingIndicator.tsx   # Animated "..." indicator
│
├── hooks/
│   └── useChat.ts                    # Chat state + streaming logic
│
├── lib/
│   └── chat/
│       ├── provider.ts               # Provider interface + factory
│       ├── ollama.ts                 # Ollama client (local)
│       ├── cloudflare.ts             # Cloudflare client (production)
│       └── systemPrompt.ts           # Your portfolio context
│
└── types/
    └── chat.ts                       # TypeScript interfaces
```

**Total: 13 new files to create**

---

## Implementation Phases (Phase 1 - COMPLETE ✅)

### Step 1: Foundation (Types & Config) ✅

**Files created:**

1. **`src/types/chat.ts`**
   ```typescript
   export type ChatRole = 'system' | 'user' | 'assistant'

   export interface ChatMessage {
     role: ChatRole
     content: string
   }
   ```

2. **`src/lib/chat/systemPrompt.ts`**
   - Contains all context about you (Fozan)
   - Skills, services, experience, stats
   - Communication guidelines for the AI

3. **`.env.local`** (add these variables)
   ```bash
   # Local Development
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=llama3.1:8b

   # Production (Cloudflare)
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   CLOUDFLARE_API_TOKEN=your_api_token
   ```

---

### Step 2: Backend (API Route) ✅

**Files created:**

4. **`src/lib/chat/provider.ts`**
   - Defines `ChatProvider` interface
   - Factory function that returns Ollama or Cloudflare based on environment

5. **`src/lib/chat/ollama.ts`**
   - Connects to local Ollama instance
   - Handles streaming response transformation

6. **`src/lib/chat/cloudflare.ts`**
   - Connects to Cloudflare Workers AI
   - Handles their SSE format

7. **`src/app/api/chat/route.ts`**
   - POST endpoint accepting `{ messages: [...] }`
   - Returns Server-Sent Events (SSE) stream
   - Injects system prompt automatically

---

### Step 3: Frontend (UI Components) ✅

**Files created:**

8. **`src/hooks/useChat.ts`**
   - Manages messages array state
   - Handles streaming response parsing
   - Provides `sendMessage`, `isTyping`, `error` state

9. **`src/components/compound/ChatTypingIndicator.tsx`**
   - Three animated dots
   - Bouncing animation using Framer Motion

10. **`src/components/compound/ChatMessage.tsx`**
    - Message bubble component
    - Different styling for user vs assistant
    - Slide-in animation

11. **`src/components/compound/ChatInput.tsx`**
    - Textarea with send button
    - Enter to send, Shift+Enter for newline
    - Disabled state during response

12. **`src/components/compound/ChatWindow.tsx`**
    - Container for messages and input
    - Header with title and close button
    - Auto-scroll to latest message
    - Neumorphic styling matching your portfolio

13. **`src/components/compound/ChatToggleButton.tsx`**
    - Floating action button (bottom-right)
    - Mouse-tracking effect (like your DirectionalButton)
    - Toggles between chat and close icons

---

### Step 4: Integration ✅

14. **`src/components/complex/ChatBot.tsx`**
    - Orchestrates toggle button and window
    - Uses `useChat` hook
    - Handles open/close state

15. **Modify `src/app/layout.tsx`**
    - Add `<ChatBot />` component
    - Will appear on all pages

---

### Step 5: Deployment (Pending)

1. **Create Cloudflare account** (free)
2. **Get API credentials:**
   - Account ID (from dashboard URL)
   - API Token (create with Workers AI permissions)
3. **Add env vars to Vercel** (or your hosting)
4. **Deploy and test**

---

## UI Design Specifications

### Design Tokens (from your existing styles)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#171717` | Chat window bg |
| Background 2 | `#121212` | Input field, message bubbles |
| Accent | `#ff9776` | Send button, user messages |
| Text Primary | `#dddddd` | Main text |
| Text Secondary | `#999999` | Placeholder, timestamps |
| Border | `rgba(255,255,255,0.05)` | Subtle dividers |

### Neumorphic Shadow
```css
box-shadow: 10px 10px 15px #0A0A0A, -10px -10px 15px #2C2C2C;
```

### Layout

```
┌──────────────────────────────────────┐
│  ┌──────────────────────────────┐    │
│  │  AI  Fozan's Assistant    ✕  │    │  ← Header
│  │      Ask me anything...      │    │
│  ├──────────────────────────────┤    │
│  │                              │    │
│  │  ┌────────────────────────┐  │    │
│  │  │ User message           │  │    │  ← Right-aligned, orange
│  │  └────────────────────────┘  │    │
│  │                              │    │
│  │  ┌────────────────────────┐  │    │
│  │  │ Assistant response...  │  │    │  ← Left-aligned, dark
│  │  └────────────────────────┘  │    │
│  │                              │    │
│  │  ● ● ●                       │    │  ← Typing indicator
│  │                              │    │
│  ├──────────────────────────────┤    │
│  │  [Type a message...]    [➤]  │    │  ← Input area
│  └──────────────────────────────┘    │
│                                      │
│                              [ 💬 ]  │  ← Toggle button (FAB)
└──────────────────────────────────────┘
```

### Animations
- **Window open:** Scale from 0.8 + fade in (spring physics)
- **Messages:** Slide up + fade in (staggered 50ms)
- **Typing dots:** Bounce animation (0.6s loop, 0.15s stagger)
- **Toggle button:** Icon rotation on state change

---

## System Prompt Content

The AI will know about:

```
- Full Stack Developer & AI/LLM Developer
- 4+ years experience
- 50+ satisfied customers
- 20+ completed projects

Skills:
- Frontend: React, Next.js, TypeScript, Tailwind
- Backend: Node.js, Express, MongoDB
- Cloud: AWS, Docker, Vercel
- AI/ML: LLM Integration, RAG Systems, Vector DBs
- Testing: Cypress, Playwright, Jest

Services:
- AI/LLM Integration
- RAG Systems
- AI Chatbots & Assistants
- Payment Integration (Stripe)
- Authentication & Security
- SEO Optimization
- Cloud & Deployment
- Testing & Automation

Contact:
- Phone: 03322440974
- Contact form on website
```

---

## Local Development Setup

### Prerequisites

1. **Install Ollama:**
   ```bash
   brew install ollama
   ```

2. **Pull Llama 3.1 8B:**
   ```bash
   ollama pull llama3.1:8b
   ```

3. **Start Ollama (runs in background):**
   ```bash
   ollama serve
   ```

4. **Test it works:**
   ```bash
   curl http://localhost:11434/api/chat -d '{
     "model": "llama3.1:8b",
     "messages": [{"role": "user", "content": "Hello!"}],
     "stream": false
   }'
   ```

### Running the Dev Server

```bash
npm run dev
```

The chatbot will automatically use Ollama when `NODE_ENV=development`.

---

## Production Setup (Cloudflare)

### 1. Create Cloudflare Account
- Go to https://dash.cloudflare.com
- Sign up (free)

### 2. Get Your Account ID
- URL will look like: `https://dash.cloudflare.com/abc123xyz`
- `abc123xyz` is your Account ID

### 3. Create API Token
- Go to: My Profile → API Tokens → Create Token
- Use template: "Workers AI" or create custom with:
  - Account: Workers AI → Read
- Copy the token

### 4. Add to Vercel
```
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_token
```

### 5. Deploy
```bash
git push origin main
# Vercel auto-deploys
```

---

## Verification Checklist

### Local Testing
- [ ] Ollama installed and running
- [ ] Model pulled (`ollama list` shows llama3.1:8b)
- [ ] Dev server starts without errors
- [ ] Chat toggle button visible (bottom-right)
- [ ] Clicking opens chat window with animation
- [ ] Can type and send message
- [ ] Response streams in real-time
- [ ] Typing indicator shows during response
- [ ] Close button works
- [ ] System prompt context works (ask "What are Fozan's skills?")

### Production Testing
- [ ] Cloudflare credentials in Vercel env vars
- [ ] Deployed successfully
- [ ] Chat works on production URL
- [ ] Response times are acceptable (<2s first token)
- [ ] No errors in Vercel logs

### Mobile Testing
- [ ] Chat window fits on mobile screen
- [ ] Toggle button doesn't overlap content
- [ ] Input is usable on mobile keyboard
- [ ] Scrolling works in messages area

---

## Portfolio Talking Points

After implementing this, you can say:

> "Built a custom AI chatbot using self-hosted Llama 3.1 8B, deployed on Cloudflare's edge infrastructure with streaming responses. The system uses a provider abstraction pattern for local development with Ollama and production deployment on Cloudflare Workers AI."

**Skills demonstrated:**
- LLM deployment and hosting
- Streaming API design (SSE)
- Provider pattern / abstraction layers
- Edge computing (Cloudflare Workers)
- Real-time UI with Framer Motion

---

---

# PHASE 2: Fine-tuning (Future Enhancement)

## What is Fine-tuning?

### Analogy: Teaching a Chef

| Stage | Analogy | LLM Equivalent |
|-------|---------|----------------|
| **Pre-trained model** | A chef who went to culinary school, knows all cuisines | Llama 3.1 8B (trained on internet data) |
| **Fine-tuning** | Teaching that chef YOUR family recipes | Training on YOUR data |
| **Fine-tuned model** | Same chef, but now specializes in your food | Llama 3.1 + Fozan knowledge baked in |

### Visual Explanation

```
┌─────────────────────────────────────────────────────────────────┐
│                    LLAMA 3.1 8B (Pre-trained)                   │
│                                                                 │
│   Knows: General knowledge, coding, writing, math, etc.         │
│   Doesn't know: Who Fozan is                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │  + Your Dataset (Q&A about Fozan)
                              │  + 2-4 hours training on RTX 4060
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│               LLAMA 3.1 8B + FOZAN (Fine-tuned)                 │
│                                                                 │
│   Knows: Everything Llama knew + deeply understands Fozan       │
│   Responds naturally about you without needing system prompt    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Current Approach vs Fine-tuned Approach

### Current (System Prompt) - Phase 1 ✅
```
Every request:
┌──────────────────────────────────────────────────┐
│ System: "You are Fozan's assistant. Fozan is..." │  ← Sent every time
│ User: "What are his skills?"                     │
│ Llama reads context → generates response         │
└──────────────────────────────────────────────────┘
```
- ✅ Quick to set up
- ❌ Context sent with every message (uses tokens)
- ❌ Model doesn't "deeply" understand, just reads instructions

### Fine-tuned Approach - Phase 2
```
Every request:
┌──────────────────────────────────────────────────┐
│ User: "What are his skills?"                     │
│ Model already knows Fozan → generates response   │  ← Knowledge is baked in
└──────────────────────────────────────────────────┘
```
- ✅ Knowledge is permanent in model weights
- ✅ More natural responses
- ✅ No need for long system prompts
- ❌ Takes time to set up initially

---

## How LoRA/QLoRA Fine-tuning Works

We DON'T modify all billions of parameters (would need massive GPU).
Instead, we train a small **adapter layer**:

```
┌─────────────────────────────────────────┐
│         Llama 3.1 8B (Frozen)           │  ← Original weights unchanged (4.7GB)
│  ┌───────────────────────────────────┐  │
│  │   LoRA Adapter (Trained)          │  │  ← Small layer we train (50-100MB)
│  │   Only ~1-5% of parameters        │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Result: Base model + LoRA adapter = Your custom "fozan-assistant" model
```

---

## Fine-tuning Requirements

### Hardware (You Have Both!)

| Device | Can Fine-tune? | Time Estimate |
|--------|---------------|---------------|
| **RTX 4060 8GB** | ✅ Yes (QLoRA) | 2-4 hours |
| **M1 Pro 32GB** | ✅ Yes (MLX) | 3-5 hours |

### Software

```bash
# Option 1: Unsloth (Recommended - NVIDIA GPU)
pip install unsloth

# Option 2: MLX (Apple Silicon)
pip install mlx-lm
```

### Dataset (You Create This)

50-200 Q&A pairs about yourself:

```jsonl
{"instruction": "Who is Fozan?", "output": "Fozan is a Full Stack Developer and AI/LLM Developer with 4+ years of experience..."}
{"instruction": "What services does Fozan offer?", "output": "Fozan offers AI/LLM Integration, RAG Systems, AI Chatbots..."}
{"instruction": "What is Fozan's tech stack?", "output": "Fozan specializes in React, Next.js, TypeScript, Node.js, AWS..."}
{"instruction": "How can I contact Fozan?", "output": "You can reach Fozan at 03322440974 or use the contact form..."}
{"instruction": "Tell me about Fozan's experience", "output": "With 4+ years in Full-Stack JavaScript development..."}
```

---

## Phase 2 Implementation Steps

### Step 1: Create Dataset (~1-2 hours)

Create `fine-tuning/data.jsonl` with 50-200 examples covering:
- Personal info questions
- Skills and expertise
- Services offered
- Project descriptions
- Experience and background
- Contact information
- Casual variations ("hey", "hi", "what's up")

### Step 2: Set Up Training Environment

```bash
# Create virtual environment
python -m venv fine-tune-env
source fine-tune-env/bin/activate

# Install Unsloth (for RTX 4060)
pip install unsloth
```

### Step 3: Fine-tune the Model (~2-4 hours)

```python
# fine-tuning/train.py
from unsloth import FastLanguageModel

# Load base model
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/llama-3.1-8b-bnb-4bit",
    max_seq_length=2048,
    load_in_4bit=True,
)

# Add LoRA adapter
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_alpha=16,
    lora_dropout=0,
)

# Train on your dataset
# ... training code ...

# Save the model
model.save_pretrained("fozan-assistant-lora")
```

### Step 4: Convert to Ollama Format

```bash
# Create Modelfile
cat > Modelfile << 'EOF'
FROM llama3.1:8b
ADAPTER ./fozan-assistant-lora

SYSTEM You are Fozan's AI assistant.
EOF

# Create Ollama model
ollama create fozan-assistant -f Modelfile
```

### Step 5: Update Environment Variable

```bash
# .env.local
OLLAMA_MODEL=fozan-assistant  # Changed from llama3.1:8b
```

### Step 6: Test

```bash
ollama run fozan-assistant "Who is Fozan?"
```

---

## Fine-tuning Cost

| Item | Cost |
|------|------|
| Dataset creation | Free (your time) |
| Training compute | **Free** (your GPU) |
| Running fine-tuned model | **Free** (same as base) |
| Total | **$0** |

---

## Expected Improvements After Fine-tuning

| Aspect | Before (System Prompt) | After (Fine-tuned) |
|--------|----------------------|-------------------|
| Response naturalness | Good | Excellent |
| Token usage | Higher (system prompt every time) | Lower |
| "Personality" consistency | Sometimes drifts | Stable |
| Edge case handling | May need prompt engineering | Handles naturally |
| Portfolio flex factor | Good | **Maximum** |

---

## Updated Portfolio Talking Points

After implementing Phase 2, you can say:

> "Built a custom AI chatbot with a **fine-tuned Llama 3.1 8B model** trained on my portfolio data using QLoRA. The model runs locally via Ollama for development and deploys to Cloudflare Workers AI in production. Implemented streaming responses with SSE and a provider abstraction pattern."

**Skills demonstrated:**
- LLM fine-tuning with LoRA/QLoRA
- Dataset creation and curation
- Model deployment and hosting
- Streaming API design (SSE)
- Provider pattern / abstraction layers
- Edge computing (Cloudflare Workers)
- Real-time UI with Framer Motion

---

## Phase 2 Checklist

- [ ] Create dataset (50-200 Q&A pairs)
- [ ] Set up Unsloth environment
- [ ] Fine-tune model on RTX 4060
- [ ] Convert to Ollama format
- [ ] Test locally
- [ ] Update production (optional: host fine-tuned model)
- [ ] Write "How I Built This" blog post

---

## Questions?

Let me know if you want me to:
1. Adjust the UI design
2. Modify the system prompt content
3. Add additional features (clear chat, export, etc.)
4. Start Phase 2 fine-tuning setup
5. Help create the training dataset
