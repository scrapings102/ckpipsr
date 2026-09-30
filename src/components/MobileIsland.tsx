import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './mobile-island.css';

/**
 * Mobile / tablet header — the Hanging Island.
 *
 * A capsule hung from the top edge of the screen on two cords, with clasps
 * at the edge and rings where the cords meet it. It swings in on load and
 * settles, then idles with a faint sway. Tapping it sets it swinging again.
 *
 * MOTION, KEPT CHEAP
 *   The swing is a damped spring run on requestAnimationFrame — but only
 *   while it is actually moving. Once it settles the loop stops, and the
 *   faint idle sway is a plain CSS animation. So there is no endless JS loop
 *   draining a phone battery. Everything is off for reduced-motion users.
 *
 * Colours come from the site's own palette (passed in as `theme`) — navy and
 * blue on CET, brown and gold on CMC. Shared by both sites.
 *
 * The logo and the menu are real buttons, so they are proper tap targets and
 * readable by screen readers.
 */

export type IslandTheme = {
    body1: string;       // capsule, top of gradient
    body2: string;       // capsule, bottom of gradient
    edge: string;        // capsule border
    ring: string;        // ring around the seal
    cord: string;        // cord gradient
    clasp: string;       // clasp gradient
    status: string;      // subtitle colour
    button: string;      // menu button
    buttonIcon: string;  // menu button bars
    buttonGlow: string;  // menu button shadow
};

type Props = {
    theme: IslandTheme;
    title: string;
    subtitle: string;
    logo: React.ReactNode;
    menuOpen: boolean;
    onMenu: () => void;
    onLogo: () => void;
    /** Inside pages: no island. The menu is opened from the icon on the
     *  breadcrumb line; this renders only the X, in the reference's corner,
     *  while the menu is open. */
    compact?: boolean;
};

export default function MobileIsland({ theme, title, subtitle, logo, menuOpen, onMenu, onLogo, compact = false }: Props) {
    const rig = useRef<HTMLDivElement | null>(null);
    const kick = useRef<(impulse: number) => void>(() => { });
    const settle = useRef<() => void>(() => { });
    const btn = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const el = rig.current;
        if (!el) return;
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        let angle = 12;          // swings in on load
        let velocity = 0;
        let raf = 0;
        let last = 0;
        const STIFF = 38;
        const DAMP = 2.6;

        const step = (t: number) => {
            const dt = last ? Math.min(0.033, (t - last) / 1000) : 0.016;
            last = t;
            velocity += (-STIFF * angle - DAMP * velocity) * dt;
            angle += velocity * dt;
            el.style.transform = `rotate(${angle.toFixed(3)}deg)`;
            if (Math.abs(angle) < 0.03 && Math.abs(velocity) < 0.03) {
                el.style.transform = 'rotate(0deg)';
                raf = 0;             // settled — stop the loop; CSS takes over the idle sway
                return;
            }
            raf = requestAnimationFrame(step);
        };
        const start = () => {
            if (!raf) {
                last = 0;
                raf = requestAnimationFrame(step);
            }
        };
        kick.current = (impulse: number) => {
            velocity += impulse;
            start();
        };
        settle.current = () => {
            cancelAnimationFrame(raf);
            raf = 0;
            angle = 0;
            velocity = 0;
            el.style.transform = 'rotate(0deg)';
        };
        start();
        return () => cancelAnimationFrame(raf);
    }, []);

    /* ---- open / close without a single visual jump ----
       The header pins to the top of the screen while the menu is open, and
       unpins once the menu has fully swept away. Whether that is invisible
       depends on where the page was scrolled:
  
         at the top  -> pinned and normal positions are the same, so the island
                        simply fades out (open) and back in with a swing (close)
         scrolled    -> pinning brings the island from off-screen to the top.
                        On OPEN its parts hide instantly (no pop-in) and only the
                        X fades in. On CLOSE everything fades out and stays
                        hidden until the header has unpinned, then fades back in
                        at its real position — so nothing is ever seen jumping. */
    const [away, setAway] = useState(false);       // hidden while unpinning
    const [instant, setInstant] = useState(false); // hide without a fade
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        const scrolled = window.scrollY > 2;
        if (menuOpen) {
            setAway(false);
            setInstant(scrolled);
            return;
        }
        setInstant(false);
        if (!scrolled) {
            kick.current(-35);
            return;
        }
        setAway(true);
        // the menu sweeps out in 0.8s; the header unpins right after
        const t = setTimeout(() => setAway(false), 900);
        return () => clearTimeout(t);
    }, [menuOpen]);

    // While the menu is open, the X sits where the reference puts its button:
    // a 48px button 16px from the right edge and 20px from the top — so its
    // centre is at (screen width - 40px, 44px). Measured after the header has
    // pinned to the top, then applied as a translate so it glides there.
    useEffect(() => {
        const b = btn.current;
        if (!b || compact) return;
        const reset = () => {
            b.style.setProperty('--mi-dx', '0px');
            b.style.setProperty('--mi-dy', '0px');
        };
        if (!menuOpen) {
            reset();
            return;
        }
        settle.current();
        let f2 = 0;
        const f1 = requestAnimationFrame(() => {
            f2 = requestAnimationFrame(() => {
                reset();
                const r = b.getBoundingClientRect();
                const dx = window.innerWidth - 40 - (r.left + r.width / 2);
                const dy = 44 - (r.top + r.height / 2);
                b.style.setProperty('--mi-dx', `${Math.round(dx)}px`);
                b.style.setProperty('--mi-dy', `${Math.round(dy)}px`);
            });
        });
        return () => {
            cancelAnimationFrame(f1);
            cancelAnimationFrame(f2);
        };
    }, [menuOpen, compact]);

    const vars = {
        '--mi-body1': theme.body1,
        '--mi-body2': theme.body2,
        '--mi-edge': theme.edge,
        '--mi-ring': theme.ring,
        '--mi-cord': theme.cord,
        '--mi-clasp': theme.clasp,
        '--mi-status': theme.status,
        '--mi-button': theme.button,
        '--mi-button-icon': theme.buttonIcon,
        '--mi-button-glow': theme.buttonGlow,
    } as React.CSSProperties;

    if (compact) {
        // Rendered at the page level (a portal), so it floats above the header,
        // the page and the open menu alike, and is never clipped or trapped by
        // a parent's position or transform.
        if (typeof document === 'undefined') return null;
        return createPortal(
            <div className="mi mi--compact" style={vars}>
                <button
                    type="button"
                    className={`mi-menu mi-fab${menuOpen ? ' is-open' : ''}`}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    onClick={onMenu}
                >
                    <span className="mi-bars" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                    </span>
                </button>
            </div>,
            document.body,
        );
    }

    return (
        <div className={`mi${menuOpen ? ' is-open' : ''}${away ? ' is-away' : ''}${instant ? ' is-instant' : ''}`} style={vars}>
            <div className="mi-rig" ref={rig}>
                <div className="mi-idle">
                    <span className="mi-clasp mi-l" aria-hidden="true" />
                    <span className="mi-clasp mi-r" aria-hidden="true" />
                    <span className="mi-cord mi-l" aria-hidden="true" />
                    <span className="mi-cord mi-r" aria-hidden="true" />
                    <span className="mi-ring mi-l" aria-hidden="true" />
                    <span className="mi-ring mi-r" aria-hidden="true" />

                    <div
                        className="mi-island"
                        onClick={() => kick.current((Math.random() < 0.5 ? -1 : 1) * 60)}
                    >
                        <button
                            type="button"
                            className="mi-seal"
                            aria-label={`${title} — home`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onLogo();
                            }}
                        >
                            {logo}
                        </button>
                        <div className="mi-text">
                            <span className="mi-title">{title}</span>
                            <span className="mi-sub">{subtitle}</span>
                        </div>
                        <button
                            ref={btn}
                            type="button"
                            className={`mi-menu${menuOpen ? ' is-open' : ''}`}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            onClick={(e) => {
                                e.stopPropagation();
                                onMenu();
                            }}
                        >
                            <span className="mi-bars" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}