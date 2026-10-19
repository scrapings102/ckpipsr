import type { ComponentType } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";

/**
 * The icon component for a name chosen in the admin panel.
 *
 * The panel's icon picker offers the whole library, but each page only
 * imports the handful it was built with. So: a name the page already knows
 * uses the page's own icon; any other library icon is loaded on its own when
 * first shown; and a name the library does not have draws the page's default.
 *
 * Components are cached per name, so the same name always gives the same
 * component and React never remounts it between renders.
 */
const known = new Set<string>(iconNames);
const cache = new Map<string, ComponentType<LucideProps>>();

/** "HeartPulse" → "heart-pulse", "Building2" → "building-2", the library's file names. */
const kebab = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])([0-9])/g, "$1-$2")
    .toLowerCase();

export function iconFor(
  name: string | undefined,
  map: Record<string, LucideIcon | ComponentType<LucideProps>>,
  Fallback: LucideIcon | ComponentType<LucideProps>,
): ComponentType<LucideProps> {
  if (!name) return Fallback;
  const own = map[name];
  if (own) return own;
  const file = kebab(name);
  if (!known.has(file)) return Fallback;
  const key = `${file}|${(Fallback as { displayName?: string }).displayName ?? Fallback.name}`;
  let Icon = cache.get(key);
  if (!Icon) {
    const Loaded = (props: LucideProps) => (
      // props first: an SVG may carry its own `name` attribute, which must not replace the icon's.
      <DynamicIcon {...props} name={file as IconName} fallback={() => <Fallback {...props} />} />
    );
    Loaded.displayName = `Icon(${name})`;
    cache.set(key, Loaded);
    Icon = Loaded;
  }
  return Icon;
}
