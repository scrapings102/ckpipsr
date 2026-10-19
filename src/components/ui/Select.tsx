import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { useLenis } from "../../context/LenisContext";

export type SelectOption = { value: string; label: string };

/**
 * The site's own dropdown, in place of the browser's native <select>.
 *
 * The closed box is a <button>, so each form passes its own input classes in
 * `className` and the box keeps that form's look (height, border, focus and
 * error colours). `tone` picks the accent the form already uses: gold on the
 * admissions and help desk forms, green on the rest.
 */
type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /**
   * Text for the empty first choice. The native lists offered it as an option,
   * so it stays pickable here and choosing it sets the value back to "".
   */
  placeholder?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  className?: string;
  tone?: "gold" | "green";
  ref?: React.Ref<HTMLButtonElement>;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

// Radix does not allow an item whose value is "", so the empty choice travels
// under this stand-in and is turned back into "" before the form sees it.
const EMPTY = "__select-empty__";

const TONES = {
  gold: {
    open: "data-[state=open]:border-[#D4AF37]",
    item: "data-[highlighted]:bg-[#D4AF37]/12",
    check: "text-[#2D2424]",
  },
  green: {
    open: "data-[state=open]:border-[#1a5d2e]",
    item: "data-[highlighted]:bg-[#1a5d2e]/[0.07]",
    check: "text-[#1a5d2e]",
  },
};

export function Select({
  value,
  onChange,
  options,
  placeholder,
  id,
  name,
  required,
  disabled,
  onBlur,
  className,
  tone = "green",
  ref,
  ...aria
}: SelectProps) {
  // Opening the list moves focus from the box into the list, which fires a
  // blur. A native select stays focused while open, so that blur must not
  // count as leaving the field (it would show "please choose" mid-pick).
  const openRef = React.useRef(false);
  const colours = TONES[tone];

  // Radix locks page scrolling while the list is open, but Lenis drives the
  // page from its own wheel listener and ignores that lock, so the page would
  // slide away under an open list. Pause Lenis while open, and only resume it
  // if this list was the one that paused it (a popup may have paused it first).
  const lenis = useLenis();
  const pausedLenis = React.useRef(false);
  const resumeLenis = React.useCallback(() => {
    if (pausedLenis.current) lenis?.start();
    pausedLenis.current = false;
  }, [lenis]);
  React.useEffect(() => resumeLenis, [resumeLenis]);

  // A native select whose value matches none of its options shows the first
  // one. Do the same for display only, so the box is never blank; the form's
  // own value is left as it is.
  const shown =
    placeholder === undefined && !options.some((option) => option.value === value)
      ? (options[0]?.value ?? value)
      : value;

  return (
    <SelectPrimitive.Root
      value={shown}
      onValueChange={(next) => onChange(next === EMPTY ? "" : next)}
      onOpenChange={(open) => {
        openRef.current = open;
        if (open && lenis && !lenis.isStopped) {
          lenis.stop();
          pausedLenis.current = true;
        } else if (!open) {
          resumeLenis();
        }
      }}
      name={name}
      required={required}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        ref={ref}
        id={id}
        onBlur={() => {
          if (!openRef.current) onBlur?.();
        }}
        {...aria}
        className={cn(
          "group flex items-center justify-between gap-3 text-left cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
          className,
          "data-[placeholder]:text-slate-500",
          colours.open
        )}
      >
        <span className="min-w-0 truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            size={16}
            aria-hidden
            className="shrink-0 text-slate-500 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          side="bottom"
          sideOffset={6}
          collisionPadding={12}
          // Lenis takes wheel and touch scrolling for the page; this tells it
          // to leave scrolling inside the list to the list.
          data-lenis-prevent="true"
          className="select-panel z-[90] w-[var(--radix-select-trigger-width)] max-h-[min(18rem,var(--radix-select-content-available-height))] overflow-hidden rounded-xl border border-slate-200 bg-white text-sm text-[#2D2424] shadow-[0_12px_32px_-12px_rgba(45,36,36,0.25),0_2px_6px_-2px_rgba(45,36,36,0.08)]"
        >
          <SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center text-slate-500">
            <ChevronUp size={14} aria-hidden />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-1.5">
            {placeholder !== undefined && (
              <Item value={EMPTY} label={placeholder} itemClass={colours.item} checkClass={colours.check} muted />
            )}
            {options.map((option) => (
              <Item
                key={option.value}
                value={option.value}
                label={option.label}
                itemClass={colours.item}
                checkClass={colours.check}
              />
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center text-slate-500">
            <ChevronDown size={14} aria-hidden />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

function Item({
  value,
  label,
  itemClass,
  checkClass,
  muted,
}: {
  value: string;
  label: string;
  itemClass: string;
  checkClass: string;
  muted?: boolean;
}) {
  return (
    <SelectPrimitive.Item
      value={value}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg py-2.5 pl-3 pr-9 leading-snug outline-none data-[state=checked]:font-semibold data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        itemClass,
        muted && "text-slate-500"
      )}
    >
      <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={cn("absolute right-3 inline-flex items-center", checkClass)}>
        <Check size={15} strokeWidth={2.5} aria-hidden />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
