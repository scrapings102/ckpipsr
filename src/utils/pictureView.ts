/**
 * Frames every picture on its chosen visible area.
 *
 * In the admin panel each picture has an Edit button where the editor picks
 * the part that must stay in view. That choice rides on the picture's address
 * as `#view=x,y,zoom` (focus point in percent, zoom 1 to 3). Browsers ignore
 * the part after `#` when loading, so this watches the page for pictures that
 * carry it and sets their object-position (and zoom) to match. One watcher
 * covers every component, so no page had to be changed to honour it.
 *
 * Zoom uses the `scale` property rather than `transform`, so it adds to any
 * hover or reveal animation a component already runs instead of replacing it.
 */
const VIEW = /#view=(-?[\d.]+),(-?[\d.]+)(?:,([\d.]+))?$/;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function frame(img: HTMLImageElement) {
  const src = img.getAttribute("src") ?? "";
  const m = src.match(VIEW);
  const applied = img.dataset.view;
  if (!m) {
    // The picture was swapped for one without an area: undo ours, leave the component's own.
    if (applied) {
      img.style.objectPosition = "";
      img.style.removeProperty("scale");
      img.style.transformOrigin = "";
      img.style.clipPath = "";
      delete img.dataset.view;
    }
    return;
  }
  if (applied === m[0]) return;
  const x = clamp(Number(m[1]), 0, 100);
  const y = clamp(Number(m[2]), 0, 100);
  const zoom = clamp(Number(m[3] ?? 1), 1, 3);
  img.style.objectPosition = `${x}% ${y}%`;
  img.style.transformOrigin = `${x}% ${y}%`;
  if (zoom > 1) {
    img.style.setProperty("scale", String(zoom));
    // Scaling grows the picture past its own box, which shows wherever no
    // parent clips it (a round author photo spills over the name beside it).
    // This cuts it back to the box it had, keeping any rounded corners.
    const keep = 1 - 1 / zoom;
    const radius = getComputedStyle(img).borderTopLeftRadius;
    const round = radius && radius !== "0px" ? ` round calc(${radius} / ${zoom})` : "";
    img.style.clipPath = `inset(${y * keep}% ${(100 - x) * keep}% ${(100 - y) * keep}% ${x * keep}%${round})`;
  } else {
    img.style.removeProperty("scale");
    img.style.clipPath = "";
  }
  img.dataset.view = m[0];
}

export function installPictureViews() {
  if (typeof window === "undefined" || !("MutationObserver" in window)) return;
  const scan = (root: ParentNode) => root.querySelectorAll?.("img").forEach(frame);
  scan(document);
  new MutationObserver((records) => {
    for (const r of records) {
      if (r.type === "attributes" && r.target instanceof HTMLImageElement) frame(r.target);
      r.addedNodes.forEach((node) => {
        if (node instanceof HTMLImageElement) frame(node);
        else if (node instanceof Element) scan(node);
      });
    }
  }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["src"] });
}
