"""Generates the CKP building drawing in the footer, in this site's palette:
  src/assets/campus-engraving-fill.webp  the drawing (your SVG, recoloured)
  src/assets/campus-engraving-ink.webp   its pen lines
  src/components/CampusEngraving.tsx     the component that reveals them

Sources, in scripts/:
  campus_engraving.svg      the drawing (filled shapes, greys), used as is
  campus_engraving_ink.txt  one pen stroke per line, traced from that drawing's
                            centre lines (without the tank); one path per line

What it does:
  - drops the drawing's full-canvas white background, crops to the building
  - leaves out the water tank on the roof, with a mask (its lines are carved out
    of one large shape, so it can't be removed shape by shape)
  - recolours: each grey maps through three palette colours — darkest to the
    lines colour, mid-tones to the accent, white to the body — so it reads as
    an engraving in the site's own colours
The path data is copied untouched (it is written in relative steps, so even
rounding it would make shapes drift).

The two layers are ready-made bitmaps (lossless WebP, 1800px wide — sharp on
2x-3x screens): a browser shows them without rendering 656 vector shapes on
the spot, which on first view could stall the reveal. They don't add to the
site's JavaScript, are cached, and are decoded in the background as soon as
the page loads. The reveal (campus-engraving.css) only slides and fades them.

Run from frontend/:
  pip install playwright pillow && python3 -m playwright install chromium
  python3 scripts/campus_engraving_gen.py
"""
import os
import re

# ── this site's palette ───────────────────────────────────────────────────────
SITE = "ipsr"
PALETTES = {
    #        lines      mid-tones  body       pen
    "cmc": ("#2D2424", "#A8841F", "#FBF6E6", "#D4AF37"),   # brand brown, deep gold, warm cream, gold
    "cet": ("#0F1E36", "#2563EB", "#F4F8FF", "#2563EB"),   # navy, CET blue, blue-white, blue
    "ipsr": ("#123A1A", "#2C7A47", "#F3F9F1", "#2C7A47"),  # IPSR: deep green, leaf green, pale green-white, green
}
LINES, MID, BODY, PEN = PALETTES[SITE]

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "campus_engraving.svg")
INK_SRC = os.path.join(HERE, "campus_engraving_ink.txt")
ASSETS = os.path.join(HERE, "..", "src", "assets")
COMPONENT = os.path.join(HERE, "..", "src", "components", "CampusEngraving.tsx")

VIEWBOX = (4, 199, 2036, 901)       # the drawing (10 205 2034 1094) plus a small margin
# the water tank, in the SVG's units: dome + platform, the shaft, and the right
# pipe above and below the annex cap (the annex beside it is kept)
HIDE = ((958, 198, 1111, 333), (996, 326, 1063, 437.6), (1063, 326, 1072, 358), (1063, 374, 1072, 437.6))
PEN_WIDTH = 2.4


def rgb(h):
    h = h.lstrip("#")
    h = "".join(c * 2 for c in h) if len(h) == 3 else h
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def recolour(grey):
    r, g, b = rgb(grey)
    t = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    a, z, u = (rgb(LINES), rgb(MID), t / 0.5) if t < 0.5 else (rgb(MID), rgb(BODY), (t - 0.5) / 0.5)
    return "#%02x%02x%02x" % tuple(round(x * (1 - u) + y * u) for x, y in zip(a, z))


def mask(mid):
    vx, vy, vw, vh = VIEWBOX
    holes = "".join(f'<rect x="{x1}" y="{y1}" width="{round(x2 - x1, 1):g}" height="{round(y2 - y1, 1):g}" fill="#000"/>' for x1, y1, x2, y2 in HIDE)
    return (f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="{vx}" y="{vy}" width="{vw}" height="{vh}">'
            f'<rect x="{vx}" y="{vy}" width="{vw}" height="{vh}" fill="#fff"/>{holes}</mask>')


def main():
    s = open(SRC, encoding="utf-8").read()
    grads = "".join(
        f'<linearGradient id="g-{m.group(1)}" '
        + " ".join(f'{k}="{v}"' for k, v in re.findall(r'(x1|x2|y1|y2)="([^"]*)"', m.group(2)))
        + ' gradientUnits="userSpaceOnUse">'
        + "".join(f'<stop offset="{o}" stop-color="{recolour(c)}"/>' for o, c in re.findall(r'offset="([^"]*)" stop-color="([^"]*)"', m.group(3)))
        + "</linearGradient>"
        for m in re.finditer(r'<linearGradient id="(\w+)" ([^>]*)>(.*?)</linearGradient>', s, re.S)
    )
    shapes = []
    for i, m in enumerate(re.finditer(r"<path([^>]*)/?>", s)):
        if i == 0:
            continue                                            # the white background
        d = re.search(r'\sd="([^"]*)"', m.group(1)).group(1)
        f = re.search(r'fill="([^"]*)"', m.group(1))
        f = f.group(1) if f else "#000"
        shapes.append(f'<path fill="{"url(#g-" + f[5:] if f.startswith("url(#") else recolour(f)}" d="{d}"/>')
    head = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{" ".join(map(str, VIEWBOX))}" preserveAspectRatio="xMidYMax meet">'
    fill_svg = f'{head}<defs>{grads}{mask("m")}</defs><g mask="url(#m)">{"".join(shapes)}</g></svg>\n'
    strokes = [l.strip() for l in open(INK_SRC, encoding="utf-8") if l.strip()]
    ink_svg = (f'{head}<path fill="none" stroke="{PEN}" stroke-width="{PEN_WIDTH}" stroke-linecap="round" '
               f'stroke-linejoin="round" d="{" ".join(strokes)}"/></svg>\n')
    os.makedirs(ASSETS, exist_ok=True)
    rasterise({"campus-engraving-fill": fill_svg, "campus-engraving-ink": ink_svg})
    with open(COMPONENT, "w", encoding="utf-8") as fh:
        fh.write(COMPONENT_SRC.format(site=SITE.upper(), n=len(shapes), k=len(strokes), lines=LINES, mid=MID, body=BODY, pen=PEN))
    print(f"{SITE}: {len(shapes)} shapes, {len(strokes)} pen strokes -> src/assets/campus-engraving-{{fill,ink}}.webp, CampusEngraving.tsx")


RASTER_WIDTH = 1800


def rasterise(svgs):
    """Each SVG -> a lossless WebP, rendered by headless Chromium (exact SVG rendering)."""
    import tempfile
    from io import BytesIO
    from PIL import Image
    from playwright.sync_api import sync_playwright
    w = RASTER_WIDTH
    h = round(w * VIEWBOX[3] / VIEWBOX[2])
    with tempfile.TemporaryDirectory() as tmp, sync_playwright() as p:
        browser = p.chromium.launch()
        for name, svg in svgs.items():
            src = os.path.join(tmp, name + ".svg")
            with open(src, "w", encoding="utf-8") as fh:
                fh.write(svg)
            html = os.path.join(tmp, name + ".html")
            with open(html, "w", encoding="utf-8") as fh:
                fh.write(f'<html><body style="margin:0;background:transparent"><img src="{name}.svg" style="width:{w}px;height:{h}px;display:block"></body></html>')
            page = browser.new_page(viewport={"width": w, "height": h})
            page.goto("file://" + html)
            page.wait_for_function("document.images[0].complete && document.images[0].naturalWidth > 0")
            png = page.screenshot(omit_background=True)
            page.close()
            Image.open(BytesIO(png)).convert("RGBA").save(
                os.path.join(ASSETS, name + ".webp"), "WEBP", lossless=True, quality=100, method=6)
        browser.close()


COMPONENT_SRC = '''/**
 * The CKP building in the footer, under "Until we meet on campus" — {site}
 * colours: lines {lines}, mid-tones {mid}, body {body}, pen {pen}.
 *
 * Generated by scripts/campus_engraving_gen.py ({n} shapes, {k} pen strokes,
 * without the water tank). To change it, replace the source files in
 * scripts/ and run the script — don't edit the SVGs by hand.
 *
 * When the footer comes into view, the pen lines open from the entrance out to
 * both sides, the drawing fills in just behind them, and the ink fades — it
 * replays each time the footer returns to view. Each layer is split into two
 * halves whose windows slide outwards while their content slides back by the
 * same amount: only translations animate, so everything is painted once at full
 * sharpness and never repainted, on any device (campus-engraving.css).
 */

import {{ useEffect }} from 'react';
import './campus-engraving.css';
import fillUrl from '../assets/campus-engraving-fill.webp';
import inkUrl from '../assets/campus-engraving-ink.webp';

export default function CampusEngraving({{ drawn }}: {{ drawn: boolean }}) {{
  // decode both images in the background as soon as the page loads, so the
  // reveal never waits on them
  useEffect(() => {{
    for (const src of [fillUrl, inkUrl]) {{
      const img = new Image();
      img.src = src;
      img.decode?.().catch(() => undefined);
    }}
  }}, []);
  // each layer in two halves, uncovered from the entrance outwards
  const halves = (src: string) =>
    (['l', 'r'] as const).map((side) => (
      <div key={{side}} className={{`ckpc-half ${{side}}`}}>
        <div className="ckpc-inner">
          <img className="ckpc-layer" src={{src}} alt="" draggable={{false}} decoding="async" />
        </div>
      </div>
    ));
  return (
    <div className={{`ckpc-art ${{drawn ? 'is-drawn' : ''}}`}} aria-hidden="true">
      <div className="ckpc-fill">{{halves(fillUrl)}}</div>
      <div className="ckpc-ink">{{halves(inkUrl)}}</div>
    </div>
  );
}}
'''

if __name__ == "__main__":
    main()
