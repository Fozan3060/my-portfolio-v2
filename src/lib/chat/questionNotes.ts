// Short notes appended after a visitor's latest question. The model follows a rule placed
// right after the question far better than the same rule in the system prompt, but a note on
// every question made English answers shorter and more invented, so each note only fires on
// the messages that need it. Visitors never see these notes.

// Arabic-script block, which covers Urdu.
const URDU_SCRIPT = /[\u0600-\u06FF]/

// Common Roman Urdu function words that rarely appear in English. Ambiguous ones like
// "main", "me", "to", and "hi" are deliberately left out.
const ROMAN_URDU_WORDS = new Set([
  'hai', 'hain', 'kya', 'kaun', 'kahan', 'kab', 'kaise', 'kyun', 'kyon', 'mein', 'ka', 'ki', 'ke', 'ko', 'se',
  'aur', 'nahi', 'nahin', 'karta', 'karti', 'karte', 'karega', 'rehta', 'rehti', 'raha', 'rahi', 'wala', 'wali',
  'batao', 'bataen', 'tha', 'thi', 'hoga', 'uska', 'uski', 'unka', 'apna', 'apni', 'kuch', 'bohat', 'bahut',
])

// Speaking to Fozan by name ("Fozan, ...", "Hey Fozan", "Fozan bro, ..."), but not
// questions about him ("Fozan's email?", "Fozan works where?").
const ADDRESSES_FOZAN = /^\s*(?:(?:hi|hey|hello|salam|yo)\s+fozan\b|fozan(?:\s+(?:bro|bhai|sir|ji))?\s*[,!:])/i

// A request to produce writing ("Write my cover letter", "Can you draft a DM from Fozan ..."),
// but not questions about Fozan's work ("Does Fozan write blog posts?") or summaries of him.
const WRITING_REQUEST = /(?:^|[.!?]\s+)(?:please\s+)?(?:(?:can|could|would|will)\s+you\s+(?:please\s+)?)?(?:write|draft|compose|generate|prepare|craft)\b/i
const WRITING_ARTIFACT = /\b(?:message|dm|e-?mail|letter|post|application|intro(?:duction)?|tweet|pitch|proposal|essay|poem|story|code|function|script|query|sql|regex)s?\b/i

export function looksUrdu(text: string): boolean {
  if (URDU_SCRIPT.test(text)) return true
  const words = new Set(text.toLowerCase().split(/[^a-z]+/))
  let hits = 0
  for (const word of words) {
    if (ROMAN_URDU_WORDS.has(word) && ++hits >= 2) return true
  }
  return false
}

export function addressesFozan(text: string): boolean {
  return ADDRESSES_FOZAN.test(text)
}

export function isWritingRequest(text: string): boolean {
  return WRITING_REQUEST.test(text) && WRITING_ARTIFACT.test(text)
}

export function withQuestionNotes(question: string): string {
  const notes: string[] = []
  // Urdu answers invent facts, and the English-only rule alone is ignored. Measured on 36 Urdu and
  // Roman Urdu questions: this wording got 94% English replies, a plain "may write in Urdu" note
  // 89%, and "do not write any Urdu" 81%. A note placed before the question failed entirely.
  if (looksUrdu(question)) {
    notes.push('(The visitor wrote in Urdu or Roman Urdu. Reply in English only, not in Urdu or Roman Urdu, using only facts from the knowledge base.)')
  }
  // Otherwise the model sometimes answers "tell me about yourself" as if it were Fozan.
  if (addressesFozan(question)) {
    notes.push("(The visitor is talking to Fozan's AI assistant, not Fozan. Say you're his assistant and describe Fozan in the third person.)")
  }
  // Framed as "from Fozan" or "for Fozan", drafting requests slip past the off-topic rule and
  // produce messages written in his voice.
  if (isWritingRequest(question)) {
    notes.push("(This asks you to write something. Don't write it, even partly or as a template. Say you can only answer questions about Fozan.)")
  }
  return notes.length ? `${question}\n\n${notes.join(' ')}` : question
}
