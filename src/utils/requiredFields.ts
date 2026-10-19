/**
 * Which boxes on a public form must be filled in, as the panel set them.
 *
 * Snapshots published before this setting existed have no map at all, and a
 * form that gains a box later has one key fewer in every stored row, so each
 * key the response lacks keeps the default the form shipped with.
 */
export function fillRequired<K extends string>(
  defaults: Record<K, boolean>,
  value: unknown,
): Record<K, boolean> {
  const given = (typeof value === "object" && value !== null ? value : {}) as Record<string, unknown>;
  const filled = { ...defaults };
  for (const key of Object.keys(defaults) as K[]) {
    if (typeof given[key] === "boolean") filled[key] = given[key];
  }
  return filled;
}

/** What a box is called on the form, and the grey hint inside it ('' for none). */
export interface FieldText {
  label: string;
  placeholder: string;
}

/**
 * The labels and hints as the panel set them. A key the response lacks, or
 * one without a usable label, keeps the wording the form shipped with.
 */
export function fillFieldText<K extends string>(
  defaults: Record<K, FieldText>,
  value: unknown,
): Record<K, FieldText> {
  const given = (typeof value === "object" && value !== null ? value : {}) as Record<string, unknown>;
  const filled = { ...defaults };
  for (const key of Object.keys(defaults) as K[]) {
    const entry = given[key] as Partial<FieldText> | undefined;
    if (entry && typeof entry.label === "string" && entry.label.trim()) {
      filled[key] = {
        label: entry.label,
        placeholder: typeof entry.placeholder === "string" ? entry.placeholder : "",
      };
    }
  }
  return filled;
}
