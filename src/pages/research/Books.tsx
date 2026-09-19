import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Globe2, 
  Bookmark, 
  Building, 
  User, 
  Copy, 
  Check, 
  Barcode, 
  Sparkles, 
  Filter, 
  FileText,
  Layers,
  GraduationCap
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface BookPublication {
  id: number;
  author: string;
  bookTitle: string;
  chapterTitle: string;
  scope: "International" | "National";
  year: number;
  isbn: string;
  publisher: string;
  isChapter: boolean;
}

const bookData: BookPublication[] = [
  {
    id: 1,
    author: "Dr Dhiren P. Shah",
    bookTitle: "Cystic Fibrosis Disease Management and Advanced Drug Delivery Systems",
    chapterTitle: "Chapter-6-Lipid-Nanoparticles in Treating Cystic Fibrosis",
    scope: "International",
    year: 2025,
    isbn: "9781779640406",
    publisher: "Apple Academic Press",
    isChapter: true
  },
  {
    id: 2,
    author: "Dr Dhiren P. Shah",
    bookTitle: "Marine Biopolymers Processing Functionality and Applications",
    chapterTitle: "Chapter- 15 - Marine biopolymers in cancer therapeutics",
    scope: "International",
    year: 2025,
    isbn: "9780443156069 / 9780443156076",
    publisher: "Elsevier",
    isChapter: true
  },
  {
    id: 3,
    author: "Dr Dhiren P. Shah",
    bookTitle: "Nanocarriers: Drug Delivery System:An Evidence Based Approach",
    chapterTitle: "Chapter 1: Fundamentals of Nanocarriers and Drug Targeting",
    scope: "International",
    year: 2021,
    isbn: "978-981-33-4497-6",
    publisher: "SpringerNature©",
    isChapter: true
  },
  {
    id: 4,
    author: "Dr Dhiren P. Shah",
    bookTitle: "Text book of Pharmaceutical Industrial Management",
    chapterTitle: "NA",
    scope: "International",
    year: 2010,
    isbn: "978-81-312-2539-4",
    publisher: "©Elsevier",
    isChapter: false
  },
  {
    id: 5,
    author: "Dr Dhiren P. Shah",
    bookTitle: "Experimental pharmacognosy",
    chapterTitle: "NA",
    scope: "National",
    year: 2015,
    isbn: "978-93-832-9052-9",
    publisher: "S.Vikas & Company Jalandhar",
    isChapter: false
  }
];

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScope, setSelectedScope] = useState<"All" | "International" | "National">("All");
  const [selectedType, setSelectedType] = useState<"All" | "Textbook" | "Book Chapter">("All");
  const [copiedIsbn, setCopiedIsbn] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIsbn(text);
    setTimeout(() => setCopiedIsbn(null), 2000);
  };

  const filteredBooks = bookData.filter((item) => {
    const matchesSearch =
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.chapterTitle !== "NA" && item.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.isbn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.year.toString().includes(searchQuery);

    const matchesScope = selectedScope === "All" || item.scope === selectedScope;

    const matchesType =
      selectedType === "All" ||
      (selectedType === "Textbook" && !item.isChapter) ||
      (selectedType === "Book Chapter" && item.isChapter);

    return matchesSearch && matchesScope && matchesType;
  });

  return (
    <SubPageLayout
      title="Books & Chapters Published"
      subtitle="Scholarly Textbooks, Reference Monographs & Authored Book Chapters in Pharmaceutical Sciences"
      category="research-and-innovation"
      activeItemLabel="Research - Books"
    >
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Header Introduction & Controls Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <BookOpen size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    Scholarly Publications
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-[#1a5d2e] text-[11px] font-mono font-bold">
                    <GraduationCap size={12} />
                    <span>5 Authored Works</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  Authored Books & Chapters
                </h3>
              </div>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search book, chapter, publisher, ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#1a5d2e] focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Scope Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
                <Globe2 size={13} />
                <span>Scope:</span>
              </span>
              {(["All", "International", "National"] as const).map((scope) => (
                <button
                  key={scope}
                  onClick={() => setSelectedScope(scope)}
                  className={`px-3 py-1.5 rounded-xl font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedScope === scope
                      ? "bg-[#1a5d2e] text-white shadow-2xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {scope === "All" ? "All Scopes" : scope}
                </button>
              ))}
            </div>

            {/* Publication Type Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
                <Layers size={13} />
                <span>Type:</span>
              </span>
              {(["All", "Textbook", "Book Chapter"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-xl font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedType === type
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#1a5d2e]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group p-6 sm:p-7 space-y-6"
            >
              <div className="space-y-4">
                {/* Top Badges: Scope, Year, Type */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center">
                      0{book.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        book.scope === "International"
                          ? "bg-blue-50 border border-blue-200 text-blue-800"
                          : "bg-emerald-50 border border-emerald-200 text-[#1a5d2e]"
                      }`}
                    >
                      <Globe2 size={13} />
                      <span>{book.scope}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-bold">
                      <Calendar size={12} className="text-[#1a5d2e]" />
                      <span>{book.year}</span>
                    </span>

                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60">
                      {book.isChapter ? "Book Chapter" : "Textbook"}
                    </span>
                  </div>
                </div>

                {/* Book Title */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                    Title of The Book / Publication
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-[#1a5d2e] transition-colors">
                    {book.bookTitle}
                  </h4>
                </div>

                {/* Chapter Title if applicable */}
                {book.isChapter && book.chapterTitle !== "NA" && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#1a5d2e] flex items-center gap-1 tracking-wider">
                      <FileText size={12} />
                      <span>Title of the Chapter</span>
                    </span>
                    <p className="font-sans font-semibold text-slate-900 text-xs sm:text-sm leading-relaxed">
                      {book.chapterTitle}
                    </p>
                  </div>
                )}

                {/* Author Info */}
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-0.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1 tracking-wider">
                    <User size={11} className="text-[#1a5d2e]" />
                    <span>Name of Author</span>
                  </span>
                  <p className="font-sans font-bold text-slate-900 text-xs sm:text-sm">
                    {book.author}
                  </p>
                </div>
              </div>

              {/* Publisher & ISBN Footer */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs font-sans">
                {/* Publisher */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <Building size={14} className="text-[#1a5d2e] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Name of Publisher</span>
                      <span className="font-sans font-bold text-slate-800 text-xs truncate block">{book.publisher}</span>
                    </div>
                  </div>
                </div>

                {/* ISBN / ISSN with Copy Button */}
                <div className="flex items-center justify-between bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <Barcode size={14} className="text-[#1a5d2e] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">ISBN / ISSN</span>
                      <span className="font-mono font-bold text-slate-800 text-xs truncate block">{book.isbn}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(book.isbn)}
                    title="Copy ISBN"
                    className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0 border border-transparent hover:border-slate-200"
                  >
                    {copiedIsbn === book.isbn ? (
                      <Check size={13} className="text-emerald-600" />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredBooks.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 font-sans space-y-3">
            <BookOpen size={36} className="mx-auto text-slate-300" />
            <p className="text-sm font-medium">No book publication records match your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedScope("All");
                setSelectedType("All");
              }}
              className="text-xs text-[#1a5d2e] font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </SubPageLayout>
  );
}
