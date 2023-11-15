export function extractJsonFromString<T extends object>(
  inputString: string
): T {
  const jsonPattern = /\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}/;
  const match = inputString.match(jsonPattern);
  if (!match) throw new Error("parse error");

  return JSON.parse(match[0]);
}
