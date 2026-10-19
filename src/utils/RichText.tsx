import { Fragment, type ReactNode } from "react";

/**
 * A paragraph with the formatting an editor applied in the admin panel:
 * <strong>, <em>, <u> and <a href>, and the older `**bold**` some copy uses.
 *
 * Parsed into React elements, never handed to innerHTML, so even a tag that
 * slipped past the server's cleaning shows as text instead of running. Any
 * other tag keeps its words and loses its markup. Links to another site open
 * in a new tab; links within the site stay in it.
 */
const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};
const decode = (s: string) => s.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m);

const isSafeHref = (href: string) => /^(https?:\/\/|mailto:|tel:)/i.test(href) || /^\/(?!\/)/.test(href);

type Node = { tag: "root" | "strong" | "em" | "u" | "a"; href?: string; children: (Node | string)[] };

/** `**bold**` from before the panel had a toolbar, as <strong>. */
const legacyBold = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

function parse(input: string): Node {
  const root: Node = { tag: "root", children: [] };
  const stack: Node[] = [root];
  const pattern = /<\s*(\/?)\s*(strong|em|u|a)\b([^>]*)>/gi;
  let last = 0;
  const text = (s: string) => s && stack[stack.length - 1].children.push(decode(s));
  for (let m = pattern.exec(input); m; m = pattern.exec(input)) {
    text(input.slice(last, m.index));
    last = pattern.lastIndex;
    const tag = m[2].toLowerCase() as Node["tag"];
    if (m[1] === "/") {
      const at = stack.map((n) => n.tag).lastIndexOf(tag);
      if (at > 0) stack.length = at;
      continue;
    }
    const node: Node = { tag, children: [] };
    if (tag === "a") {
      const href = decode(m[3].match(/href\s*=\s*"([^"]*)"/i)?.[1] ?? "");
      if (!isSafeHref(href)) continue;
      node.href = href;
    }
    stack[stack.length - 1].children.push(node);
    stack.push(node);
  }
  text(input.slice(last));
  return root;
}

type Classes = { link?: string; strong?: string };

function render(node: Node | string, key: number, cls: Classes): ReactNode {
  if (typeof node === "string") return <Fragment key={key}>{node}</Fragment>;
  const kids = node.children.map((child, i) => render(child, i, cls));
  switch (node.tag) {
    case "strong":
      return <strong key={key} className={cls.strong}>{kids}</strong>;
    case "em":
      return <em key={key}>{kids}</em>;
    case "u":
      return <u key={key}>{kids}</u>;
    case "a": {
      const external = /^https?:\/\//i.test(node.href ?? "");
      return (
        <a
          key={key}
          href={node.href}
          className={cls.link ?? "font-semibold underline underline-offset-2"}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {kids}
        </a>
      );
    }
    default:
      return <Fragment key={key}>{kids}</Fragment>;
  }
}

/**
 * The formatted text, as inline elements. Wrap it in the paragraph the page
 * already uses. `strongClassName` keeps the look a page gave its bold words
 * before (the class it passed to withEmphasis).
 */
export function RichText({
  text,
  linkClassName,
  strongClassName,
}: {
  text: string | undefined;
  linkClassName?: string;
  strongClassName?: string;
}) {
  if (!text) return null;
  const cls = { link: linkClassName, strong: strongClassName };
  return <>{parse(legacyBold(text)).children.map((child, i) => render(child, i, cls))}</>;
}

/** The words alone, for places that need plain text: alt text, search, a page title. */
export function plainText(text: string | undefined): string {
  return decode((text ?? "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/<[^>]*>/g, ""));
}
