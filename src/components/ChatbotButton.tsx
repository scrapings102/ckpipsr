import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, GraduationCap, MapPin, BookOpen, Sparkles, ArrowUp, RotateCcw } from "lucide-react";
import { useLenis } from "../context/LenisContext";

interface Message {
  sender: "bot" | "user";
  text: string;
  time: string;
  failed?: boolean;
}

// Quick-start chips. Plain questions, sent exactly like anything the visitor
// types — the chatbot does not know these are chips rather than typing.
const QUICK_OPTIONS: { label: string; icon: typeof GraduationCap; question: string }[] = [
  { label: "Admissions", icon: GraduationCap, question: "Tell me about admissions." },
  { label: "Programs", icon: BookOpen, question: "What pharmacy courses are offered?" },
  { label: "SSIP / Startup", icon: Sparkles, question: "Tell me about the SSIP and startup cell." },
  { label: "Contact", icon: MapPin, question: "What is the campus address and contact number?" },
];

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const WELCOME: Message = {
  sender: "bot",
  text: "👋 Welcome to CKPIPSR! I'm the campus assistant — ask me about admissions, courses, fees, or anything else about the college.",
  time: now(),
};

const OFFLINE_REPLY =
  "I couldn't reach the campus assistant just now. Please try again in a moment, or call +91 63550 65636.";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lenis = useLenis();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  // One id for the life of this tab's chat: the backend uses it to keep the
  // last few turns of context. A fresh one is only drawn on Reset, below.
  const sessionId = useRef(crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 0.95 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed, time: now() }]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/chatbot-api/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, session_id: sessionId.current }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.response || OFFLINE_REPLY, time: now(), failed: !res.ok },
      ]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: OFFLINE_REPLY, time: now(), failed: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    fetch("/chatbot-api/clear_history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId.current }),
    }).catch(() => undefined);
    sessionId.current = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    setMessages([{ ...WELCOME, time: now() }]);
  };

  return (
    <>
      {/* Floating Buttons Column */}
      <div id="chatbot-wrapper" className="fixed bottom-[78px] sm:bottom-[84px] md:bottom-[96px] xl:bottom-10 right-4 sm:right-8 md:right-10 z-50 flex flex-col items-end gap-3">
        {/* Back to top button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              onClick={handleBackToTop}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-white text-[#0c2411] hover:text-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(12,36,17,0.25)] transition-colors cursor-pointer"
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
              className="w-[92vw] sm:w-[380px] h-[420px] sm:h-[520px] max-h-[62vh] sm:max-h-[75vh] bg-white rounded-3xl border border-slate-100 shadow-[0_24px_60px_rgba(12,36,17,0.25)] flex flex-col overflow-hidden"
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
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Start a new conversation"
                    title="Start a new conversation"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Chat Message Box */}
              <div ref={scrollRef} data-lenis-prevent="true" className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-slate-50 relative">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line shadow-xs border ${
                        msg.sender === "user"
                          ? "bg-[#3B3131] text-white border-transparent rounded-tr-none"
                          : msg.failed
                            ? "bg-amber-50 text-amber-900 border-amber-100 rounded-tl-none"
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
                {QUICK_OPTIONS.map(({ label, icon: Icon, question }) => (
                  <button
                    key={label}
                    onClick={() => handleSendMessage(question)}
                    disabled={isTyping}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#D4AF37]/10 hover:text-[#0c2411] text-slate-700 text-[10px] font-semibold border border-slate-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon size={12} className="text-[#D4AF37]" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Text Input Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputValue.trim()) handleSendMessage(inputValue);
                }}
                className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask any question about college..."
                  className="flex-1 px-3.5 py-2 bg-slate-100 border border-transparent hover:border-slate-200 focus:border-[#D4AF37] focus:bg-white text-xs text-slate-800 rounded-xl outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-[#0c2411] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#113a1b] text-white rounded-xl transition-all cursor-pointer"
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
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0c2411] hover:bg-[#113a1b] text-white rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(12,36,17,0.35)] transition-colors cursor-pointer"
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
