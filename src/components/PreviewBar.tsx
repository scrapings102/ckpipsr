import { previewToken } from "../hooks/previewToken";

/**
 * A slim line along the bottom of the screen while the site is opened from
 * the admin panel's Preview draft, so nobody mistakes unpublished changes for
 * the live site. It sits above everything, the intro loader included.
 */
export default function PreviewBar() {
  if (!previewToken()) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-[10000] flex items-center justify-center gap-3 bg-[#112815] px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center font-sans text-xs text-white shadow-[0_-2px_12px_rgba(0,0,0,0.2)] sm:text-sm"
    >
      <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#C19A20]" aria-hidden />
      <span>
        <strong className="font-semibold">Preview.</strong> These are unpublished changes; visitors do not see them yet.
      </span>
    </div>
  );
}
