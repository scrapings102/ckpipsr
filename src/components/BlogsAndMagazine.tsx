import React, { useState, useEffect } from 'react';
import { useLenis } from "../context/LenisContext";
import { useModalScrollLock } from "../hooks/useModalScrollLock";
import { useBlogsContent } from "../hooks/useBlogsContent";
import { RichText, plainText } from "../utils/RichText";
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, Sparkles, ArrowUpRight, Clock, User, Tag,
  Search, Download, Eye, ChevronRight, X, Heart, Share2,
  Newspaper, Trophy
} from 'lucide-react';

/** The show-all filter. Its label comes from the panel; this is only its key. */
const ALL = '__all__';

/**
 * A formatted paragraph without its first letter, for the drop cap. The cap
 * itself is plainText(text).charAt(0); this takes the same letter out of the
 * markup, stepping over any tags or **bold** in front of it.
 */
function withoutFirstLetter(text: string): string {
  let at = 0;
  for (; ;) {
    const rest = text.slice(at);
    const tag = rest.match(/^<[^>]*>/);
    if (tag) {
      at += tag[0].length;
      continue;
    }
    if (/^\*\*(.+?)\*\*/.test(rest)) {
      at += 2;
      continue;
    }
    break;
  }
  const entity = text.slice(at).match(/^&(?:amp|lt|gt|quot|#39|nbsp);/);
  const head = text.slice(0, at);
  const rest = text.slice(at + (entity ? entity[0].length : 1));
  // A one-letter **A** leaves an empty pair behind, which would show as stars.
  if (head.endsWith('**') && rest.startsWith('**')) return head.slice(0, -2) + rest.slice(2);
  return head + rest;
}

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  likes: number;
}

interface MagazineIssue {
  id: string;
  title: string;
  edition: string;
  year: string;
  coverImage: string;
  description: string;
  highlights: string[];
  totalPages: number;
  pdfUrl: string;
  flipbookUrl: string;
  volumeLabel?: string;
  pagesLabel?: string;
  highlightsLabel?: string;
  previewLabel?: string;
  downloadLabel?: string;
  flipbookLabel?: string;
}

/** The edition wording an edition can set for itself in the panel. */
type EditionLabel = 'volumeLabel' | 'pagesLabel' | 'highlightsLabel' | 'previewLabel' | 'downloadLabel' | 'flipbookLabel';

export default function BlogsAndMagazine() {
  // Edited under Homepage, Blogs & Magazine in the admin panel. Mapped into
  // the shapes this band was built around, so its markup is unchanged.
  const content = useBlogsContent();
  const BLOG_POSTS: BlogPost[] = content.blogs.posts.map((p, i) => ({
    id: `post-${i}`,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    author: { name: p.authorName, role: p.authorRole, avatar: p.authorAvatar },
    date: p.date,
    readTime: p.readTime,
    coverImage: p.coverImage,
    excerpt: p.excerpt,
    content: p.content,
    likes: 0,
  }));
  const MAGAZINE_ISSUES: MagazineIssue[] = content.magazine.issues.map((m, i) => ({ id: `issue-${i}`, ...m }));
  const [activeView, setActiveView] = useState<'all' | 'pharma-blogs' | 'college-newsletter'>('pharma-blogs');
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedMagazine, setSelectedMagazine] = useState<MagazineIssue | null>(null);
  const lenis = useLenis();
  useModalScrollLock(Boolean(selectedPost || selectedMagazine));

  const [toast, setToast] = useState<{ message: string } | null>(null);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#college-newsletter') {
        setActiveView('college-newsletter');
      } else if (window.location.hash === '#pharma-blogs') {
        setActiveView('pharma-blogs');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const handleClose = () => {
      setSelectedPost(null);
      setSelectedMagazine(null);
    };
    window.addEventListener('closeAllModals', handleClose);
    return () => window.removeEventListener('closeAllModals', handleClose);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [likesMap, setLikesMap] = useState<Record<string, number>>({
    'blog-1': 142,
    'blog-sports-1': 128,
    'blog-2': 98,
    'blog-sports-2': 115,
    'blog-3': 85,
    'blog-4': 112,
  });

  const categories = [ALL, ...content.blogs.categories];

  // An edition's own wording, else the band's line (which already falls back to the default).
  const editionLabel = (issue: MagazineIssue, key: EditionLabel) => issue[key] || content.labels[key];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === ALL || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plainText(post.excerpt).toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <section id="blogs-magazine" className="py-10 sm:py-24 bg-[#ffffff] text-[#123a1a] font-sans relative overflow-hidden border-t border-slate-100 scroll-mt-20">
      {/* Background Soft Subtle Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1a5d2e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#1a5d2e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#1a5d2e]/10 border border-[#1a5d2e]/20 text-[#1a5d2e] font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-3 sm:mb-4">
            <Sparkles size={12} className="text-[#1a5d2e]" />
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#123a1a] tracking-tight leading-tight mb-3 sm:mb-4">
            {content.headingLead}{content.headingAccent && <> <span className="text-[#1a5d2e] italic font-light">{content.headingAccent}</span></>}
          </h2>
          <p className="text-slate-600 font-sans text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            <RichText text={content.intro} strongClassName="font-semibold text-[#123a1a]" />
          </p>

          {/* Section Selector: PHARMA BLOGS | THE COLLEGE NEWSLETTER */}
          <div className="mt-5 sm:mt-8 inline-flex items-center p-1 sm:p-1.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs max-w-full overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveView('pharma-blogs')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${activeView === 'pharma-blogs'
                  ? 'bg-[#1a5d2e] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1a5d2e]'
                }`}
            >
              <BookOpen size={14} />
              <span>{content.blogs.title.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setActiveView('college-newsletter')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${activeView === 'college-newsletter'
                  ? 'bg-[#1a5d2e] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1a5d2e]'
                }`}
            >
              <Newspaper size={14} />
              <span>{content.magazine.title.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: PHARMA BLOGS (Articles & Blogs)                */}
        {/* ========================================================= */}
        {(activeView === 'all' || activeView === 'pharma-blogs') && (
          <section id="pharma-blogs" className="scroll-mt-24 mb-16 sm:mb-24">
            {/* Section 1 Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-slate-200/80">


              {/* Quick Search in Pharma Blogs */}
              <div className="relative w-full md:w-72 shrink-0">
                <input
                  type="text"
                  placeholder={content.labels.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-full py-2 pl-9 pr-4 text-xs font-sans text-[#123a1a] placeholder:text-slate-400 outline-none focus:border-[#1a5d2e] focus:ring-1 focus:ring-[#1a5d2e] transition-all"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 -mx-1 mb-6 sm:mb-8 scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${selectedCategory === cat
                      ? 'bg-[#1a5d2e] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1a5d2e]/50 hover:text-[#123a1a]'
                    }`}
                >
                  {cat === ALL ? content.blogs.allLabel : cat}
                </button>
              ))}
            </div>

            {/* Grid of Articles & Blogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1a5d2e]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative h-36 sm:h-48 overflow-hidden bg-slate-100">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-md text-[#123a1a] font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-slate-200/60 flex items-center gap-1">
                        {post.category === 'Sports' && <Trophy size={11} className="text-[#1a5d2e]" />}
                        <span>{post.category}</span>
                      </span>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-mono mb-1.5 sm:mb-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-[#123a1a] group-hover:text-[#1a5d2e] transition-colors line-clamp-2 leading-snug mb-1.5 sm:mb-2">
                        {post.title}
                      </h4>
                      <p className="text-slate-600 text-xs font-light line-clamp-2 sm:line-clamp-3 leading-relaxed mb-2 sm:mb-4">
                        <RichText text={post.excerpt} />
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 border-t border-slate-100/80 mt-auto pt-3 sm:pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      {/* The author photo is optional in the panel. */}
                      {post.author.avatar && (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-slate-200"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[140px] sm:max-w-[160px]">
                        {post.author.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#1a5d2e] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      {content.labels.readLabel} <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {filteredPosts.length === 0 && (
              <p className="text-center text-sm text-slate-500 py-10">{content.labels.noArticles}</p>
            )}
          </section>
        )}

        {/* Divider between Section 1 & Section 2 when both are visible */}
        {activeView === 'all' && (
          <div className="relative my-10 sm:my-16 flex items-center justify-center">
            <div className="w-full border-t border-slate-200" />
            <div className="absolute bg-white px-4 text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a5d2e]" />
              <span>Institutional Periodicals</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a5d2e]" />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 2: THE COLLEGE NEWSLETTER (Campus Magazine)        */}
        {/* ========================================================= */}
        {(activeView === 'all' || activeView === 'college-newsletter') && (
          <section id="college-newsletter" className="scroll-mt-24">
            {/* Section 2 Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-slate-200/80">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 font-mono text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
                  <Newspaper size={12} />
                  <span>{content.magazine.kicker}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#123a1a] tracking-tight">
                  {content.magazine.title.toUpperCase()}
                </h3>
                <p className="text-slate-600 font-sans text-xs sm:text-sm font-light mt-1 max-w-2xl">
                  <RichText text={content.magazine.text} />
                </p>
              </div>
            </div>

            {/* Grid of Campus Magazine Issues */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {MAGAZINE_ISSUES.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch"
                >
                  {/* Magazine Cover Card */}
                  {/* Pressing the cover opens the same preview as the Preview button below. */}
                  <div
                    onClick={() => setSelectedMagazine(issue)}
                    className="w-full sm:w-48 shrink-0 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group cursor-pointer aspect-[3/4] sm:aspect-auto"
                  >
                    <img
                      src={issue.coverImage}
                      alt={issue.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase mb-1">{issue.edition}</span>
                      <h5 className="font-serif font-bold text-sm leading-tight text-white">{issue.title}</h5>
                    </div>
                  </div>

                  {/* Info Block */}
                  <div className="flex-1 flex flex-col justify-between text-left py-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] font-bold text-[#1a5d2e] uppercase bg-[#1a5d2e]/10 px-2.5 py-1 rounded-full border border-[#1a5d2e]/20">
                          {editionLabel(issue, 'volumeLabel')} {issue.year}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{issue.totalPages} {editionLabel(issue, 'pagesLabel')}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-serif font-bold text-[#123a1a] mb-2 truncate">{issue.title}</h3>
                      <p className="text-slate-600 text-[13px] font-light leading-relaxed mb-4 line-clamp-3"><RichText text={issue.description} /></p>

                      <div className="space-y-2 mb-6">
                        <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">{editionLabel(issue, 'highlightsLabel')}</span>
                        {issue.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-[13px] text-slate-700">
                            <ChevronRight size={14} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                            <span className="line-clamp-2 leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      <button
                        onClick={() => setSelectedMagazine(issue)}
                        className="flex-1 bg-[#1a5d2e] hover:bg-[#123a1a] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Eye size={16} />
                        <span>{editionLabel(issue, 'previewLabel')}</span>
                      </button>
                      {/* Only an edition with a PDF set in the panel has a download button. */}
                      {issue.pdfUrl && (
                        <a
                          href={issue.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl border border-slate-200 text-slate-700 hover:border-[#1a5d2e] hover:text-[#1a5d2e] hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                          title={editionLabel(issue, 'downloadLabel')}
                          aria-label={`${editionLabel(issue, 'downloadLabel')}: ${issue.title}`}
                        >
                          <Download size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {MAGAZINE_ISSUES.length === 0 && (
              <p className="text-center text-sm text-slate-500 py-10">{content.labels.noEditions}</p>
            )}
          </section>
        )}

      </div>

      {/* ARTICLE READER MODAL - LUXUS NO-AI EDITORIAL MODAL DESIGN */}
      <AnimatePresence>
        {selectedPost && (
          <div data-lenis-prevent="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-20 sm:pb-24">

            {/* Glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-[#0c2411]/80 backdrop-blur-md cursor-pointer"
            />

            {/* Reading sheet paper overlay */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="bg-white border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative z-20 text-left rounded-3xl"
            >
              {/* Close floating bubble */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-40 w-10 h-10 rounded-xl bg-white hover:bg-slate-50 transition flex items-center justify-center border border-slate-200 text-slate-700 hover:scale-105 shadow-sm cursor-pointer"
                aria-label="Close panel"
              >
                <X size={16} />
              </button>

              <div data-lenis-prevent="true" className="overflow-y-auto flex-1 no-scrollbar">

                {/* Stunning Premium Hero Image */}
                <div className="w-full h-52 sm:h-64 relative overflow-hidden select-none bg-slate-100">
                  <img
                    src={selectedPost.coverImage}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

                  <div className="absolute bottom-4 left-6 sm:left-10 z-10 text-left">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-[#0c2411] bg-amber-400 px-3 py-1.5 rounded uppercase border border-amber-500/20 shadow-lg">
                      {selectedPost.category}
                    </span>
                  </div>
                </div>

                {/* Refined Academic Blog Header */}
                <div className="bg-gradient-to-br from-[#0c2411]/5 to-[#0c2411]/10 p-8 sm:p-10 border-b border-slate-200 relative">
                  <div className="flex flex-wrap items-center gap-2 mb-3 select-none text-[10px] font-sans font-bold tracking-widest">
                    <span className="bg-[#0c2411] text-amber-400 px-3 py-1.5 rounded uppercase inline-block font-sans font-bold">
                      {selectedPost.category}
                    </span>
                    <span className="text-[#0c2411] uppercase font-mono font-bold">
                      • {selectedPost.subtitle}
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3.5xl font-bold text-[#0c2411] leading-tight tracking-tight uppercase">
                    {selectedPost.title}
                  </h3>
                </div>

                {/* Content block */}
                <div className="p-8 sm:p-12 flex flex-col gap-6 font-sans">

                  {/* Document date metadata block */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 text-[11px] text-slate-400">
                    <div className="flex items-center gap-5">
                      <span className="flex items-center gap-1.5 font-sans font-bold text-slate-700">
                        <Clock size={14} className="text-amber-500" />
                        {selectedPost.date}
                      </span>
                      <span className="flex items-center gap-1.5 font-sans font-medium">
                        <BookOpen size={14} />
                        {selectedPost.readTime}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard?.writeText(window.location.href);
                        setToast({ message: content.labels.shareCopiedMessage });
                      }}
                      className="text-[10px] font-sans font-bold text-[#0c2411] hover:text-[#0c2411] flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Share2 size={12} />
                      <span>{content.labels.shareLabel}</span>
                    </button>
                  </div>

                  {/* HTML formatted body text with first-letter drop-cap */}
                  <div className="text-slate-700 font-sans leading-relaxed text-sm sm:text-base space-y-6 antialiased font-normal">
                    {selectedPost.content.map((paragraph, idx) => (
                      <p key={idx} className="text-slate-600 font-sans leading-relaxed text-[13.5px] sm:text-[15px] tracking-wide">
                        {/* A drop cap only suits an opening paragraph long enough to wrap around it. */}
                        {idx === 0 && plainText(paragraph).length >= 160 ? (
                          <>
                            <span className="float-left text-5xl font-sans font-bold text-[#0c2411] mr-2.5 mt-1 leading-none select-none">
                              {plainText(paragraph).charAt(0)}
                            </span>
                            <RichText text={withoutFirstLetter(paragraph)} />
                          </>
                        ) : (
                          <RichText text={paragraph} />
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Author detail block */}
                  <div className="bg-[#FAF8F5] p-5 border border-slate-200 flex items-center justify-between gap-4 rounded-2xl mt-5 select-none animate-fade-in">
                    <div className="flex items-center gap-3">
                      {selectedPost.author.avatar && (
                        <img
                          src={selectedPost.author.avatar}
                          alt={selectedPost.author.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="text-left font-sans">
                        <h5 className="text-[13px] font-bold text-slate-700">
                          {selectedPost.author.name}
                        </h5>
                        <span className="text-[10px] text-slate-455 leading-none inline-block font-sans">
                          {selectedPost.author.role}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] text-[#0c2411] font-sans font-bold tracking-widest bg-white border border-slate-200 shadow-xs px-3 py-1.5 rounded uppercase">
                      {content.labels.editorialLabel}
                    </span>
                  </div>

                </div>

              </div>

              {/* Seal details footer */}
              <div className="bg-[#FAF9F5] border-t border-slate-200 px-8 py-5 flex items-center justify-between text-[9.5px] font-mono text-slate-400 uppercase tracking-widest select-none">
                <span>{content.labels.articleFooter}</span>
                <span>{content.blogs.title}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAGAZINE PREVIEW MODAL */}
      <AnimatePresence>
        {selectedMagazine && (
          <div data-lenis-prevent="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-24 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#123a1a] text-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden relative border border-white/10 shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedMagazine(null)}
                className="absolute top-6 right-6 z-40 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div data-lenis-prevent="true" className="overflow-y-auto flex-1 no-scrollbar p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <img
                    src={selectedMagazine.coverImage}
                    alt={selectedMagazine.title}
                    className="w-40 h-56 object-cover rounded-xl shadow-xl border border-white/10 shrink-0"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 space-y-3">
                    <span className="font-mono text-xs text-[#D4AF37] uppercase font-bold tracking-widest bg-white/10 px-2.5 py-1 rounded-md inline-block">
                      {selectedMagazine.edition}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white">{selectedMagazine.title}</h3>
                    <p className="text-xs text-white/70 font-light leading-relaxed"><RichText text={selectedMagazine.description} /></p>

                    {/* Only an edition with a flipbook address set in the panel has this button. */}
                    {selectedMagazine.flipbookUrl && (
                      <div className="pt-2">
                        <a
                          href={selectedMagazine.flipbookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center w-full bg-[#D4AF37] hover:bg-white text-[#123a1a] font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all cursor-pointer shadow-lg"
                        >
                          {editionLabel(selectedMagazine, 'flipbookLabel')} ({selectedMagazine.totalPages} {editionLabel(selectedMagazine, 'pagesLabel')})
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Symmetrical luxury toast notification banner compatible with iframe/sandboxed modes */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-[9999] bg-[#1a5d2e] text-white border border-[#D4AF37]/30 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm"
          >
            <Sparkles size={16} className="shrink-0 text-[#D4AF37] animate-pulse" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
