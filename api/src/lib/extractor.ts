export function extractJsonFromString<T extends object>(
  inputString: string
): T | null {
  const jsonPattern = /\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}/;

  const match = inputString.match(jsonPattern);

  if (match) {
    try {
      const extractedJson = JSON.parse(match[0]);
      return extractedJson;
    } catch (error) {
      console.error("JSON パースエラー:", error);
      return null;
    }
  } else {
    console.error("JSON 部分が見つかりませんでした");
    return null;
  }
}
