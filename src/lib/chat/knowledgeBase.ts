import { readFileSync } from 'fs'
import path from 'path'

// fine-tuning/dataset.jsonl is the single source of facts about Fozan. The fine-tuned
// model recalls less than half of it from memory, so the whole file is sent with every
// request. Read per call so edits to the dataset apply without restarting the server.
const DATASET_PATH = path.join(process.cwd(), 'fine-tuning', 'dataset.jsonl')

export function getKnowledgeBase(): string {
  return readFileSync(DATASET_PATH, 'utf8')
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const { instruction, output } = JSON.parse(line) as { instruction: string; output: string }
      return `Q: ${instruction}\nA: ${output}`
    })
    .join('\n\n')
}
