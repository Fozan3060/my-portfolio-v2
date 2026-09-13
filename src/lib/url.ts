/** "https://www.example.com/path" -> "example.com"; empty for missing or invalid links. */
export const hostOf = (link?: string) => {
  try {
    return link ? new URL(link).hostname.replace(/^www\./, '') : ''
  } catch {
    return ''
  }
}
