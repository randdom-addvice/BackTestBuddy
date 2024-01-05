export function shortenText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  const shortenedText = text.substring(0, maxLength - 3).trim() + "...";
  return shortenedText;
}
