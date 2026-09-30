import React from "react";

/**
 * Renders `**bold**` inside editable copy.
 *
 * The About paragraphs carry emphasis in the middle of a sentence, which plain
 * text cannot express and a full rich-text editor is far too much machinery
 * for. `**` is the whole vocabulary.
 *
 * Deliberately not `dangerouslySetInnerHTML`: the text comes from the admin
 * panel, and the moment it is parsed as HTML, an editor — or anyone who reaches
 * the API — can put a script on the homepage. Splitting into React text nodes
 * means the worst a bad value can do is show literal asterisks.
 */
export function withEmphasis(text: string, boldClassName: string): React.ReactNode[] {
  // Capturing split, so the delimiters stay and the odd indices are the bold runs.
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className={boldClassName}>
        {part}
      </strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}
