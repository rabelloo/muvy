/**
 * Transforms an underscore_case or dash-case text into camelCase.
 * @param text Text to transform.
 * @example
 * camelCase('MY_TEXT' || 'my-text')
 * // 'myText'
 */
export function camelCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[_-](\w)/g, (_, char) => char.toUpperCase());
}
