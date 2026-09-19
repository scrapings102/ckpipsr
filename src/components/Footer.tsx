import React from 'react';
import CkpcmcLogo from './CkpcmcLogo';
import { MapPin, Phone, Mail, ShieldCheck, Award } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => {
    let normalizedId = id;
    if (normalizedId === 'staff') normalizedId = 'faculty';
    if (normalizedId === 'activities' || normalizedId === 'news' || normalizedId === 'events') normalizedId = 'university-gazette';
    if (normalizedId === 'blogs') normalizedId = 'blogs-magazine';

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: normalizedId } });
      return;
    }

    const el = document.getElementById(normalizedId);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.start();
        (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="footer" className="bg-[#ffffff] text-[#123005] pt-16 pb-12 relative overflow-hidden border-t-2 border-[#123005]/20">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#123005]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#123005]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Institutional Identity Banner */}
        <div className="pb-12 border-b border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 select-none">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-sm border border-slate-200 shrink-0 flex items-center justify-center">
              <CkpcmcLogo className="w-full h-full" showText={false} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#123005] leading-tight">
                C.K. Pithawalla Institute
              </h3>
              <p className="font-mono text-[10.5px] text-[#1E4D0B] uppercase tracking-[0.2em] font-bold mt-0.5">
                Pharmaceutical Science and Research (CKPIPSR)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-700 shadow-2xs">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span className="font-semibold">GTU Affiliated | PCI Approved</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-700 shadow-2xs">
              <Award size={16} className="text-[#1E4D0B]" />
              <span className="font-semibold">Est. 2005</span>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-slate-200/80">
          
          {/* Column 1: Academic Programs */}
          <div className="space-y-4 text-left">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1E4D0B] font-bold">
              Pharmacy Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-sans font-light">
              <li>
                <a href="/academics/courses-offered-b-pharm" className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#1E4D0B] font-bold">›</span> Bachelor of Pharmacy (B.Pharm)
                </a>
              </li>
              <li>
                <a href="/academics/courses-offered-m-pharm" className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#1E4D0B] font-bold">›</span> Master of Pharmacy (M.Pharm)
                </a>
              </li>
              <li>
                <a href="/academics/courses-offered-d-pharm" className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#1E4D0B] font-bold">›</span> Diploma in Pharmacy (D.Pharm)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Institutional Overview */}
          <div className="space-y-4 text-left">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1E4D0B] font-bold">
              Institutional
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-sans font-light">
              <li>
                <button onClick={() => scrollToId('about')} className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#1E4D0B] font-bold">›</span> About CKPIPSR
                </button>
              </li>
              <li>
                <Link to="/about/vision-mission" className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#1E4D0B] font-bold">›</span> Vision &amp; Mission
                </Link>
              </li>
              <li>
                <Link to="/about/trust" className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#1E4D0B] font-bold">›</span> Navyug Vidyabhavan Trust
                </Link>
              </li>
              <li>
                <Link to="/about/principal" className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#1E4D0B] font-bold">›</span> Principal's Desk
                </Link>
              </li>
              <li>
                <Link to="/about/campus-map" className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#1E4D0B] font-bold">›</span> Campus Map &amp; Directions
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToId('faculty')} className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#1E4D0B] font-bold">›</span> Research Faculty
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Hub & Portals */}
          <div className="space-y-4 text-left">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1E4D0B] font-bold">
              Student Hub
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-sans font-light">
              <li>
                <button onClick={() => scrollToId('university-gazette')} className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#1E4D0B] font-bold">›</span> Gazette &amp; Circulars
                </button>
              </li>
              <li>
                <button onClick={() => scrollToId('pharma-blogs')} className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#1E4D0B] font-bold">›</span> Pharma Blogs
                </button>
              </li>
              <li>
                <button onClick={() => scrollToId('college-newsletter')} className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#1E4D0B] font-bold">›</span> The College Newsletter
                </button>
              </li>
              <li>
                <button onClick={() => scrollToId('campus-life')} className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#1E4D0B] font-bold">›</span> Research Labs &amp; Herbal Garden
                </button>
              </li>
              <li>
                <button onClick={() => scrollToId('admissions')} className="hover:text-[#1E4D0B] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#1E4D0B] font-bold">›</span> Admissions FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Coordinates */}
          <div className="space-y-4 text-left">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1E4D0B] font-bold">
              Campus Coordinates
            </h4>
            <ul className="space-y-3 text-xs text-slate-600 font-sans font-light">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#1E4D0B] shrink-0 mt-0.5" />
                <span>Near Malvan Mandir, Dumas Road, Via Magdalla Port, Surat, Gujarat 395007</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#1E4D0B] shrink-0" />
                <span className="font-mono font-semibold text-[#123005]">+91 261 272 8282</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#1E4D0B] shrink-0" />
                <a href="mailto:info@ckpipsr.ac.in" className="font-mono font-semibold text-[#1E4D0B] hover:underline">
                  info@ckpipsr.ac.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans font-light">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} C.K. Pithawala Institute of Pharmaceutical Science and Research (CKPIPSR). Managed by Navyug Vidyabhavan Trust.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#123005] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#123005] transition-colors">Terms of Service</a>
            <a href="https://ckpipsr.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#123005] transition-colors">GTU Portal</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
