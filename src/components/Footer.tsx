import React, { useEffect, lazy, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import CkpcmcLogo from './CkpcmcLogo';
import GreekFacade from './GreekFacade';
import './ckpipsr-footer.css';
import { courseHref, useCourses, visibleCourses } from '../hooks/useCourses';


/**
 * CKPIPSR footer — "Until we meet on campus".
 *
 * The same footer as CET and CMC (the change log's "standardize the footer
 * across all colleges"): a warm ivory field with a handwritten farewell and a
 * marker underline over a classical facade engraving — on the homepage only —
 * then the site navigation. In IPSR's green and gold, with IPSR's own links.
 *
 * Every link from IPSR's previous footer is carried over (programs still come
 * from the admin panel), and homepage anchors use the same Lenis-aware scroll.
 */

type Item = { label: string; to: string };

const INSTITUTE: Item[] = [
  { label: 'Profile', to: '/about/profile' },
  { label: 'Vision & Mission', to: '/about/vision-mission' },
  { label: 'The Founder', to: '/about/founder' },
  { label: 'Navyug Vidyabhavan Trust', to: '/about/trust' },
  { label: 'PO and PEOs', to: '/about/po-peos' },
  { label: 'Campus Map & Directions', to: '/about/campus-map' },
];

const GOVERNANCE: Item[] = [
  { label: 'Governing Body', to: '/about/governing-body' },
  { label: 'The Principal', to: '/about/principal' },
  { label: 'Deans & Faculty In-charges', to: '/about/deans-faculty' },
  { label: 'Faculty', to: '/academics/faculties' },
  { label: 'IQAC', to: '/about/iqac' },
  { label: 'Contact Us', to: '/about/contact-us' },
];

const STUDENT_HUB: Item[] = [
  { label: 'Gazette & Circulars', to: '/#university-gazette' },
  { label: 'Pharma Blogs', to: '/#pharma-blogs' },
  { label: 'The College Newsletter', to: '/#college-newsletter' },
  { label: 'Research Labs & Herbal Garden', to: '/#campus-life' },
  { label: 'Admissions FAQs', to: '/#admissions' },
];

const LINK_CLS =
  'block text-[13px] leading-snug text-[#3d4f40] hover:text-[#1C592F] transition-colors';

export default function Footer() {
  const navigate = useNavigate();
  // the programs column lists the courses switched on in the admin panel
  const { content: coursesContent } = useCourses();
  const PROGRAMS: Item[] = visibleCourses(coursesContent).map((course) => ({
    label: course.card.fullName.includes(course.navLabel) ? course.card.fullName : `${course.card.fullName} (${course.navLabel})`,
    to: courseHref(course.id),
  }));
  const location = useLocation();
  const isHome = location.pathname === '/';
  const ref = useRef<HTMLElement | null>(null);

  // Rewrites itself every time the footer comes into view, including when
  // the user scrolls away and back — not just the first time.
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The previous footer's handler, unchanged: homepage anchors go through
  // Lenis when it is running, and via router state from other pages.
  const handleAnchor = (path: string) => {
    const id = path.replace('/#', '');
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderItem = (item: Item) =>
    item.to.startsWith('/#') ? (
      <button type="button" onClick={() => handleAnchor(item.to)} className={`${LINK_CLS} text-left cursor-pointer`}>
        {item.label}
      </button>
    ) : (
      <Link to={item.to} className={LINK_CLS}>{item.label}</Link>
    );

  const column = (title: string, items: Item[]) => (
    <div>
      <h3 className="ckpf-h">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((it) => <li key={it.to}>{renderItem(it)}</li>)}
      </ul>
    </div>
  );

  return (
    <footer id="footer" ref={ref} className={`ckpf relative w-full overflow-hidden bg-white${isHome ? '' : ' ckpf-inner'} text-[#122415]`}>
      {/* ───────── FAREWELL + FACADE ───────── */}
      {/* The farewell and the facade belong to the homepage only; inside pages
          go straight to the links. */}
      {isHome && (
        <div className="ckpf-sky relative">
          <div className="relative mx-auto max-w-[1580px] px-6 pt-12 text-center sm:px-10 lg:px-16 lg:pt-16">
            <div className={`ckpf-write ${seen ? 'is-written' : ''}`}>
              <p className="ckpf-script" aria-label="Until we meet on campus">
                Until we meet <br className="sm:hidden" />on campus
              </p>
              {/* hand-drawn marker squiggle; draws in after the writing finishes */}
              <svg className="ckpf-underline" viewBox="0 0 100 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path pathLength={1} d="M 2 10 C 14 3 22 3 30 9 C 38 15 46 14 54 7 C 60 2 66 4 70 10 C 76 17 86 14 98 9" />
              </svg>
            </div>
          </div>

          <GreekFacade drawn={seen} />
        </div>
      )}

      {/* ───────── LINKS ───────── */}
      <div className="bg-white">
        <div className="mx-auto grid max-w-[1580px] grid-cols-2 gap-x-6 gap-y-9 px-6 pb-12 pt-10 sm:px-10 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1fr] lg:gap-8 lg:px-16">
          {/* identity + contact — spans both columns on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3.5">
              {/* the college seal — ringed in the site accent */}
              <span
                className="ckpf-seal flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1"
                style={{ boxShadow: '0 0 0 2px #1C592F, 0 6px 16px -8px rgba(0,0,0,.35)' }}
              >
                <CkpcmcLogo className="h-full w-full" showText={false} />
              </span>
              <div>
                <p className="font-sans text-[15px] font-extrabold tracking-wide text-[#123a1a]">C. K. PITHAWALLA</p>
                <p className="mt-0.5 font-sans text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#1C592F]">
                  Institute of Pharmaceutical Science &amp; Research
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-[13px] text-[#4d5f50]">
              <li className="flex gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#2c7a47]" aria-hidden="true" />
                <span>Opposite Surat Airport, Behind DPS School, Near Malvan Mandir, Dumas Road, Surat - 395007, Gujarat, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="mt-0.5 shrink-0 text-[#2c7a47]" aria-hidden="true" />
                <span>
                  <a href="tel:+916355065636" className="hover:text-[#1C592F] transition-colors">+91 63550 65636 | 9099063116</a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0 text-[#2c7a47]" aria-hidden="true" />
                <a href="mailto:info@ckpipsr.ac.in" className="hover:text-[#1C592F] transition-colors">info@ckpipsr.ac.in</a>
              </li>
            </ul>
          </div>

          {column('Pharmacy Programs', PROGRAMS)}
          {column('Institute', INSTITUTE)}
          {column('Governance', GOVERNANCE)}
          {column('Student Hub', STUDENT_HUB)}
        </div>

        {/* bottom bar */}
        <div className="mx-auto max-w-[1580px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#dfe7dc] py-6 text-center sm:flex-row sm:text-left">
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#7f8f82]">
              © {new Date().getFullYear()} C. K. Pithawalla Institute of Pharmaceutical Science &amp; Research
            </p>
            <a
              href="https://www.gtu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group/v inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.16em] text-[#7f8f82] hover:text-[#1C592F] transition-colors"
            >
              GTU Portal
              <ArrowUpRight size={12} className="opacity-60 group-hover/v:opacity-100" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}