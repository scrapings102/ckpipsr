import React from "react";
import { motion } from "motion/react";
import SubPageLayout from "../../components/SubPageLayout";
import { MapPin, Clock, Phone, Mail, Navigation, Building } from "lucide-react";

export default function ContactUs() {
  return (
    <SubPageLayout
      title="Contact Us"
      subtitle="Reach out to C. K. Pithawalla Institute of Pharmaceutical Science & Research."
      category="about-us"
      activeItemLabel="Contact Us"
    >
      <div className="space-y-16">
        {/* CAMPUS IMAGE BANNER - Refined Bento Style */}
        <section className="relative group overflow-hidden rounded-[3rem] h-[300px] md:h-[400px]">
          <img 
            src="/images/hero/65efeac7d49a3.webp" 
            alt="CKPIPSR Campus" 
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-1000 opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c2411] via-[#0c2411]/40 to-transparent" />
          
          <div className="absolute inset-0 p-10 flex flex-col justify-end">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                <Building size={14} />
                <span>Modern Campus Infrastructure</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                Visit our Pharmaceutical <br /><span className="text-[#D4AF37]">Innovation Hub</span>
              </h2>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: "Campus Address", 
              icon: MapPin, 
              content: "Opposite Surat Airport, Behind DPS School, Near Malvan Mandir, Dumas Road, Surat - 395007, Gujarat, India.",
              accent: "text-[#123a1a]"
            },
            { 
              title: "Institute Timings", 
              icon: Clock, 
              content: "09:30 AM – 05:00 PM",
              sub: "Monday to Saturday",
              note: "2nd and 4th Saturday off",
              accent: "text-[#D4AF37]"
            },
            { 
              title: "Direct Connect", 
              icon: Phone, 
              links: [
                { label: "+91 63550 65636", href: "tel:6355065636" },
                { label: "+91 90990 63116", href: "tel:9099063116" }
              ],
              accent: "text-[#123a1a]"
            },
            { 
              title: "Official Email", 
              icon: Mail, 
              links: [
                { label: "ckpipsr@gmail.com", href: "mailto:ckpipsr@gmail.com" }
              ],
              accent: "text-[#D4AF37]"
            }
          ].map((item, iIdx) => (
            <motion.div 
              key={iIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: iIdx * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all duration-500 group flex flex-col"
            >
              <div className="space-y-6 flex-1">
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-inner ${item.accent}`}>
                   <item.icon size={24} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif font-bold text-slate-900">{item.title}</h3>
                  {item.content && (
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {item.content}
                    </p>
                  )}
                  {item.sub && (
                    <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest block">
                      {item.sub}
                    </span>
                  )}
                  {item.note && (
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50/90 border border-amber-200/70 text-amber-900 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                        <span>Note: {item.note}</span>
                      </span>
                    </div>
                  )}
                  {item.links && (
                    <div className="space-y-2">
                       {item.links.map((link, lIdx) => (
                         <a key={lIdx} href={link.href} className="block text-sm font-bold text-slate-700 hover:text-[#123a1a] transition-colors font-mono">
                           {link.label}
                         </a>
                       ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Embedded Map Section - Refined */}
        <section className="bg-white rounded-[3rem] p-4 md:p-8 border border-slate-100 shadow-2xl relative overflow-hidden group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-4">
            <div className="space-y-2">
               <div className="flex items-center gap-3">
                 <Navigation className="text-[#D4AF37]" size={24} />
                 <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">Geographic Location</h3>
               </div>
               <p className="text-slate-500 font-medium">Strategically located near Surat International Airport.</p>
            </div>
            <a 
              href="https://goo.gl/maps/embed?pb=!1m14!1m8!1m3!1d5923.654116328731!2d72.71618443860855!3d21.13191122833264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be052ae998fda3d%3A0x23340ab807f12d7!2sC.K.%20Pthawalla%20Institute%20of%20Pharmaceutical%20Science%20and%20Research!5e0!3m2!1sen!2sin!4v1679122645038!5m2!1sen!2sin"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#123a1a] text-[#D4AF37] font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-[#123a1a]/10 hover:bg-[#1a4a25] transition-all"
            >
              Get Directions
            </a>
          </div>
          
          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-slate-100 shadow-inner group-hover:shadow-2xl transition-all duration-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5923.654116328731!2d72.71618443860855!3d21.13191122833264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be052ae998fda3d%3A0x23340ab807f12d7!2sC.K.%20Pthawalla%20Institute%20of%20Pharmaceutical%20Science%20and%20Research!5e0!3m2!1sen!2sin!4v1679122645038!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CKPIPSR Google Map Location"
              className="filter contrast-125 saturate-50 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
