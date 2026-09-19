import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STAFF_MEMBERS } from '../data/scrapedData';

export default function Faculty() {
  // Key leadership & departmental heads
  const leadership = [
    STAFF_MEMBERS[0], // Dr. Dhiren P. Shah - Principal
    STAFF_MEMBERS[1], // Dr. Bhumika C. Desai - Associate Professor
    STAFF_MEMBERS[2], // Dr. Vinodkumar D. Ramani - Associate Professor
    STAFF_MEMBERS[3], // Mr. Moolla Yahya Ali - Assistant Professor
  ];

  return (
    <section
      id="faculty"
      className="py-10 sm:py-24 bg-white text-navy relative overflow-hidden"
    >
      {/* Gentle Floating Watermark Background Elements */}
      <div
        className="absolute top-1/4 left-0 w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.025] select-none"
      >
        <span className="text-[24vw] font-display font-bold whitespace-nowrap tracking-tighter uppercase text-navy">
          LEADERSHIP
        </span>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10"
      >
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-16 gap-4 sm:gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-navy/60 font-semibold mb-2 sm:mb-6">
              Our Academic Leadership
            </h2>
            <h3 className="text-2xl sm:text-4xl md:text-6xl font-display leading-tight tracking-tight">
              Guided by <span className="italic text-navy">distinguished scholars</span> and educators.
            </h3>
          </div>
          <Link
            to="/about/teaching-staff"
            className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest hover:text-navy/80 transition-colors group shrink-0"
          >
            Meet Full Faculty
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-navy/20 flex items-center justify-center group-hover:bg-navy group-hover:border-navy group-hover:text-white transition-all">
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {leadership.map((member) => (
            <div
              key={member.name}
              className="group cursor-pointer bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-[#00509d] transition-all shadow-xs hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-[4/5] mb-3 sm:mb-5 bg-slate-100">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://app.ckpcet.ac.in/webroot/files/StaffMasters/photo/1645260034.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h4 className="text-base sm:text-xl font-sans font-semibold text-slate-900 mb-0.5 sm:mb-1 group-hover:text-[#00509d] transition-colors">
                  {member.name}
                </h4>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#E5B224] font-mono font-bold mb-2 sm:mb-3">
                  {member.designation}
                </p>
                <p className="text-slate-600 font-sans font-medium text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2">
                  {member.qualification}
                </p>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-slate-200/60 text-[10px] sm:text-[11px] font-mono text-slate-500 truncate">
                {member.email}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}