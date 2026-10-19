import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, Copy, Mail, Phone, X } from "lucide-react";
import { useModalScrollLock } from "../hooks/useModalScrollLock";

/**
 * Phone and email links, on a computer.
 *
 * A `tel:` or `mailto:` link hands the click to another program, and on a
 * computer the browser first asks in its own box ("Open Phone?", "Open Mail?"),
 * which looks nothing like the site and often leads nowhere useful. This
 * catches every such link on the site, including ones inside text written in
 * the admin panel, and shows the number or address in the site's own dialog
 * with a Copy button and a way to open the app anyway.
 *
 * A phone or tablet already opens its dialer or mail app straight away, so
 * there the link is left alone. The browser may still ask once if a visitor
 * chooses to open the app on a computer; no page can turn that question off.
 */
type Target = { kind: "phone" | "email"; value: string; shown: string; label: string; href: string };

const TEXT = {
  phone: {
    eyebrow: "Phone",
    title: "Call this number",
    copy: "Copy number",
    copied: "Number copied",
    open: "Open in phone app",
  },
  email: {
    eyebrow: "Email",
    title: "Write to this address",
    copy: "Copy address",
    copied: "Address copied",
    open: "Open in email app",
  },
};

/** An Indian number spaced for reading ("+91 63550 65636"); anything else as written. */
function spaced(number: string) {
  const local = /^(?:\+?91)?(\d{10})$/.exec(number.replace(/[\s-]/g, ""))?.[1];
  return local ? `+91 ${local.slice(0, 5)} ${local.slice(5)}` : number;
}

/** What a clicked link points at, or null for any other link. */
function readLink(link: HTMLAnchorElement): Target | null {
  const href = link.getAttribute("href") ?? "";
  const match = /^(tel|mailto):(.*)$/i.exec(href.trim());
  if (!match) return null;
  const kind = match[1].toLowerCase() === "tel" ? "phone" : "email";
  // A mailto may carry "?subject=..."; only the address is worth showing.
  const value = decodeURIComponent(match[2].split("?")[0]).trim();
  if (!value) return null;
  // A link that reads as a name ("Contact security / reception") says whose
  // number this is; one that repeats the number or address adds nothing.
  const text = link.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const repeats = /\d{6}/.test(text.replace(/\D/g, "")) || text.toLowerCase() === value.toLowerCase();
  const label = text && !repeats && text.length <= 40 ? text : "";
  return { kind, value, shown: kind === "phone" ? spaced(value) : value, label, href };
}

export default function ContactLinkDialog() {
  const [target, setTarget] = useState<Target | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const found = readLink(link);
      if (!found) return;
      e.preventDefault();
      setTarget(found);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!target) return null;
  // Keyed, so each link opens a fresh dialog with its Copy state cleared.
  return <Dialog key={target.href} target={target} onClose={() => setTarget(null)} />;
}

function Dialog({ target, onClose }: { target: Target; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const copyRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const text = TEXT[target.kind];
  const OpenIcon = target.kind === "phone" ? Phone : Mail;
  useModalScrollLock(true);

  const closeLatest = useRef(onClose);
  useLayoutEffect(() => {
    closeLatest.current = onClose;
  });

  // A native modal dialog sits above every other layer on the site (navbar,
  // chatbot, other popups) and keeps keyboard focus inside it. Escape fires
  // `cancel`; closing is left to the parent, which unmounts it.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const returnTo = document.activeElement as HTMLElement | null;
    if (!dialog.open) dialog.showModal();
    copyRef.current?.focus();
    const onCancel = (e: Event) => {
      e.preventDefault();
      closeLatest.current();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      if (dialog.open) dialog.close();
      if (returnTo?.isConnected) returnTo.focus();
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(target.value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  const openApp = () => {
    onClose();
    window.location.href = target.href;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-link-title"
      aria-describedby="contact-link-value"
      data-lenis-prevent="true"
      // Another popup on the page (a faculty card, a gallery) closes on any
      // Escape it hears; this one should be the only one to go.
      onKeyDown={(e) => {
        if (e.key === "Escape") e.stopPropagation();
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none items-center justify-center bg-transparent p-3 sm:p-4 open:flex backdrop:bg-transparent"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px] transition-opacity duration-200 ease-out starting:opacity-0 motion-reduce:transition-none"
      />
      <div className="relative w-full max-w-[380px] rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-[0_25px_60px_rgba(12,36,17,0.25)] transition-[opacity,transform] duration-200 ease-out starting:scale-[0.97] starting:opacity-0 motion-reduce:transition-none">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#0c2411] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c2411]"
        >
          <X size={18} />
        </button>

        <p className="pr-10 text-[11px] font-bold uppercase leading-relaxed tracking-[0.14em] text-[#1C592F]">
          {text.eyebrow}
          {target.label && <span className="text-slate-500"> · {target.label}</span>}
        </p>
        <h2 id="contact-link-title" className="mt-1.5 pr-10 font-serif text-xl font-bold text-slate-900">
          {text.title}
        </h2>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-1.5">
          <span
            id="contact-link-value"
            className="min-w-0 flex-1 select-all break-all text-base font-semibold tracking-wide text-[#0c2411]"
          >
            {target.shown}
          </span>
          <button
            ref={copyRef}
            type="button"
            onClick={copy}
            aria-label={status === "copied" ? text.copied : text.copy}
            title={text.copy}
            className={`inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c2411] active:scale-[0.96] ${
              status === "copied" ? "bg-[#1C592F]/10 text-[#1C592F]" : "text-slate-500 hover:bg-white hover:text-[#0c2411]"
            }`}
          >
            {status === "copied" ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
        <p role="status" className="mt-2 text-xs text-slate-600 empty:mt-0">
          {status === "copied" && `${text.copied}.`}
          {status === "failed" && "Could not copy. Select the text above and copy it."}
        </p>

        <button
          type="button"
          onClick={openApp}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0c2411] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1C592F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c2411] active:scale-[0.98]"
        >
          <OpenIcon size={16} />
          <span>{text.open}</span>
        </button>
      </div>
    </dialog>
  );
}
