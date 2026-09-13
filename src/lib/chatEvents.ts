// Lets any part of the page open the chat window without prop drilling through the layout.

export const OPEN_CHAT_EVENT = 'open-chat'

export function openChat() {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT))
}
