import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, GraduationCap, MapPin, BookOpen, Sparkles, ArrowUp } from "lucide-react";
import { useLenis } from "../context/LenisContext";

interface Message {
  sender: "bot" | "user";
  text: string;
  time: string;
}

const FAQ_RESPONSES: Record<string, string> = {
  "admissions": "🎓 **Admissions 2026-27:**\nAdmission is open for professional pharmacy programs. \n\n• **Courses Offered:** B.Pharm (Bachelor of Pharmacy), M.Pharm (Master of Pharmacy), and Pharm.D (Doctor of Pharmacy).\n• **Eligibility:** 12th HSC Science stream (PCB/PCM).\n• **Admission Route:** Conducted via Gujarat centralized admission process (ACPC) and Veer Narmad South Gujarat University (VNSGU) structures.\n• **Admissions Helpline:** +91 261 2723967\n• **Email:** info@ckpipsr.ac.in\n\nClick 'Apply Now' in the header to get started!",
  "academics": "📚 **Academic Programs:**\nWe offer premier, VNSGU-affiliated professional pharmacy courses:\n\n1. **B.Pharm (4 Years):** Standard graduate program in pharmacy practice, pharmaceutical chemistry, and pharmaceutical analysis.\n2. **M.Pharm (2 Years):** Specializations in Pharmaceutics, Pharmaceutical Quality Assurance, and Pharmacology.\n3. **Pharm.D (6 Years):** Intensive clinical doctorate program in hospital pharmacy, clinical pharmacotherapy, and ward rounds.",
  "research": "💡 **Incubation & SSIP cell:**\n• **SSIP Cell:** Affiliated with the Student Start-up & Innovation Policy of Gujarat state.\n• **Startup Funding:** Grants up to ₹2.5 Lakhs available for innovative pharmaceutical research and medical formulation prototype projects.\n• **Scholarships:** Financial aid is accessible through schemes like MYSY (Mukhyamantri Yuva Swavalamban Yojana), the Digital Gujarat Scholarship Portal, and specialized trust aids.",
  "location": "📍 **Campus & Contact:**\n• **Location:** Dumas Road, Near Malvan Mandir, Surat, Gujarat, 395007.\n• **Phone:** +91 261 2723967\n• **Email:** info@ckpipsr.ac.in\n• **Visiting Hours:** 9:00 AM - 4:30 PM (Monday - Saturday)"
};

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lenis = useLenis();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Welcome to CKPIPSR virtual helpdesk! I'm your interactive assistant. How can I guide you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.95 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string, isFaq = false) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botText = "";
      if (isFaq) {
        const key = text.toLowerCase();
        if (key.includes("admission")) botText = FAQ_RESPONSES.admissions;
        else if (key.includes("academic") || key.includes("program") || key.includes("course")) botText = FAQ_RESPONSES.academics;
        else if (key.includes("research") || key.includes("ssip") || key.includes("startup")) botText = FAQ_RESPONSES.research;
        else if (key.includes("contact") || key.includes("location")) botText = FAQ_RESPONSES.location;
      } else {
        // Simple keyword routing
        const query = text.toLowerCase();
        if (query.includes("admission") || query.includes("apply") || query.includes("seat") || query.includes("fees") || query.includes("hsc") || query.includes("vnsgu")) {
          botText = FAQ_RESPONSES.admissions;
        } else if (query.includes("course") || query.includes("program") || query.includes("bca") || query.includes("bba") || query.includes("bcom") || query.includes("commerce") || query.includes("class")) {
          botText = FAQ_RESPONSES.academics;
        } else if (query.includes("research") || query.includes("ssip") || query.includes("startup") || query.includes("mysy") || query.includes("grant") || query.includes("scholarship")) {
          botText = FAQ_RESPONSES.research;
        } else if (query.includes("address") || query.includes("map") || query.includes("where") || query.includes("number") || query.includes("phone") || query.includes("location") || query.includes("contact")) {
          botText = FAQ_RESPONSES.location;
        } else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
          botText = "Hello! Nice to meet you. Please select one of the topics below or type any question regarding CKPCMC admissions, programs, or campus details!";
        } else {
          botText = "Thank you for reaching out! For detailed queries regarding eligibility, fees, or administrative processes, please contact our helpdesk at **+91 261 2723967** or email **info@ckpcmc.ac.in** directly.";
        }
      }

      const botMsg: Message = {
        sender: "bot",
        text: botText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  return (
    <>
      {/* Floating Buttons Column */}
      <div id="chatbot-wrapper" className="fixed bottom-[78px] sm:bottom-[84px] md:bottom-[96px] xl:bottom-10 right-4 sm:right-8 md:right-10 z-50 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Back to top button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              onClick={handleBackToTop}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-white text-[#0c2411] hover:text-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-slate-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={16} className="sm:w-5 sm:h-5 stroke-[2.5]" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chatbot Dialogue Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="w-[92vw] sm:w-[380px] h-[420px] sm:h-[520px] max-h-[62vh] sm:max-h-[75vh] bg-white rounded-3xl border border-slate-100 shadow-[0_24px_60px_rgba(27,21,21,0.18)] overflow-hidden overscroll-contain flex flex-col font-sans mb-1"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#0c2411] p-4 text-white flex items-center justify-between border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 border border-[#D4AF37]/50 shadow-inner">
                    <span className="text-[#0c2411] font-bold text-xs font-sans">PSR</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-[13px] tracking-wide leading-none uppercase text-white">CKPIPSR GUIDE</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                      <span className="text-[9px] text-[#D4AF37] font-bold tracking-widest uppercase">Campus Assistant</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Message Box */}
              <div ref={scrollRef} data-lenis-prevent="true" className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-slate-50 relative">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line shadow-xs border ${
                        msg.sender === "user" 
                          ? "bg-[#3B3131] text-white border-transparent rounded-tr-none" 
                          : "bg-white text-slate-800 border-slate-100 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex flex-col items-start">
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-3 shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Options */}
              <div className="px-4 py-2 border-t border-slate-100 bg-white flex flex-wrap gap-1.5">
                <button 
                  onClick={() => handleSendMessage("Admissions Inquiry", true)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#D4AF37]/10 hover:text-[#0c2411] text-slate-700 text-[10px] font-bold font-sans transition-all border border-slate-200 cursor-pointer"
                >
                  <GraduationCap size={12} className="text-[#D4AF37]" />
                  <span>Admissions</span>
                </button>
                <button 
                  onClick={() => handleSendMessage("Academic Programs", true)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#D4AF37]/10 hover:text-[#0c2411] text-slate-700 text-[10px] font-bold font-sans transition-all border border-slate-200 cursor-pointer"
                >
                  <BookOpen size={12} className="text-[#D4AF37]" />
                  <span>Programs</span>
                </button>
                <button 
                  onClick={() => handleSendMessage("Scholarships & SSIP", true)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#D4AF37]/10 hover:text-[#0c2411] text-slate-700 text-[10px] font-bold font-sans transition-all border border-slate-200 cursor-pointer"
                >
                  <Sparkles size={11} className="text-[#D4AF37]" />
                  <span>SSIP / Startup</span>
                </button>
                <button 
                  onClick={() => handleSendMessage("Contact & Location", true)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#D4AF37]/10 hover:text-[#0c2411] text-slate-700 text-[10px] font-bold font-sans transition-all border border-slate-200 cursor-pointer"
                >
                  <MapPin size={11} className="text-[#D4AF37]" />
                  <span>Contact</span>
                </button>
              </div>

              {/* Text Input Footer */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputValue.trim()) {
                    handleSendMessage(inputValue);
                  }
                }}
                className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
              >
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask any question about college..."
                  className="flex-1 px-3.5 py-2 bg-slate-100 border border-transparent hover:border-slate-200 focus:border-[#D4AF37] focus:bg-white text-xs text-slate-800 rounded-xl focus:outline-none transition-all leading-normal font-sans"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 bg-[#0c2411] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#113a1b] text-white rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <div className="relative">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0c2411] hover:bg-[#113a1b] text-white rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(12,36,17,0.3)] border-2 border-[#D4AF37]/50 transition-all cursor-pointer relative"
            aria-label="Chat with assistant"
          >
            {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <MessageSquare size={20} className="sm:w-6 sm:h-6" />}
            
            {/* Symmetrical live pulsating notification dot indicator */}
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D4AF37] border-2 border-[#0c2411]"></span>
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
}
