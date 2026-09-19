import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

function NavigationMenu({
  className,
  children,
  viewport = true,
  delayDuration = 100,
  skipDelayDuration = 300,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-0 min-[1320px]:gap-1 min-[1400px]:gap-2.5 2xl:gap-4",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative static", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  "flex items-center gap-1 text-[10px] min-[1320px]:text-[11px] min-[1400px]:text-[12.5px] 2xl:text-[14.5px] font-sans font-bold py-2 px-0.5 min-[1320px]:px-1 min-[1400px]:px-2 transition-all duration-200 relative whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0 text-white hover:text-[#D4AF37] data-[state=open]:text-[#D4AF37]"
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      <ChevronDown
        size={13}
        className="transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#D4AF37] text-white/60 group-hover:text-[#D4AF37]"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        // slide + fade direction when switching between two open submenus
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out',
        'data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
        'data-[motion=from-end]:slide-in-from-right-52!',
        'data-[motion=from-start]:slide-in-from-left-52!',
        'data-[motion=to-end]:slide-out-to-right-52!',
        'data-[motion=to-start]:slide-out-to-left-52!',
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 flex justify-center pointer-events-none overflow-visible">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center relative pointer-events-auto transition-[width,height] duration-300 ease-out text-left overflow-visible",
          className
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn("cursor-pointer", className)}
      {...props}
    />
  );
}

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
};
