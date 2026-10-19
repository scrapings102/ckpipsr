/**
 * A mobile number with the India code in front. Editors sometimes type the
 * code themselves, so a number that already has it is not given a second one.
 */
export function withIndiaCode(number: string): string {
  const text = number.trim();
  if (text.startsWith("+")) return text;
  const digits = text.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91") ? `+${text}` : `+91 ${text}`;
}

/**
 * A `tel:` link for a number as printed. The leading + stays, so the country
 * code is dialled. An office number such as "+91 261 2723967 Ext. 115" dials
 * only the part before "Ext", since a phone cannot dial the extension itself.
 */
export const telHref = (number: string) =>
  `tel:${number.split(/ext/i)[0].replace(/[^\d+]/g, "")}`;
