import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ExternalLink, ArrowRight, X } from 'lucide-react';
import SubPageLayout from '../components/SubPageLayout';
import {
  searchSite,
  groupBySection,
  suggestedTerms,
  searchIndex,
} from '../utils/searchIndex';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const urlQuery = params.get('query') ?? '';

  const [input, setInput] = useState(urlQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput(urlQuery);
  }, [urlQuery]);

  const groups = useMemo(() => {
    if (!urlQuery.trim()) return [];
    return groupBySection(searchSite(urlQuery));
  }, [urlQuery]);

  const total = useMemo(
    () => groups.reduce((n, g) => n + g.items.length, 0),
    [groups],
  );

  const runSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setParams({}, { replace: true });
      return;
    }
    setParams({ query: trimmed }, { replace: true });
  };

  const go = (path: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  return (
    <SubPageLayout
      category="search"
      activeItemLabel="Search"
      title="Search"
      subtitle={
        urlQuery.trim()
          ? `${total} ${total === 1 ? 'result' : 'results'} for “${urlQuery.trim()}”`
          : `Search ${searchIndex.length} pages across the site.`
      }
    >
      <div className="max-w-3xl mx-auto font-sans">
        {/* ── Search box ── */}
        <div className="relative mb-8">
          <SearchIcon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#123a1a]/35 pointer-events-none"
          />
          <input
            ref={inputRef}
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') runSearch(input);
              if (e.key === 'Escape') {
                setInput('');
                runSearch('');
              }
            }}
            placeholder="Search pages, courses, committees…"
            aria-label="Search the site"
            className="w-full rounded-xl border border-slate-300 bg-white pl-12 pr-24 py-3.5 text-sm text-[#123a1a] placeholder:text-[#123a1a]/35 outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25"
          />
          {input && (
            <button
              type="button"
              onClick={() => {
                setInput('');
                runSearch('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-[74px] top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#123a1a]/35 hover:bg-[#FAF8F3] hover:text-[#123a1a] transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
          <button
            type="button"
            onClick={() => runSearch(input)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0c1f10] transition-colors hover:bg-[#B8933E] cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* ── Results ── */}
        {!urlQuery.trim() ? (
          <EmptyPrompt onPick={runSearch} />
        ) : total === 0 ? (
          <NoResults query={urlQuery.trim()} onPick={runSearch} />
        ) : (
          <div className="space-y-8">
            {groups.map((group) => (
              <section key={group.section}>
                <h2 className="mb-3 font-sans text-base font-semibold text-[#123a1a]/70">
                  {group.section}
                </h2>
                <ul className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {group.items.map((item) => (
                    <li key={`${item.section}-${item.label}-${item.path}`}>
                      <button
                        type="button"
                        onClick={() => go(item.path, item.isExternal)}
                        className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#FAF8F3] cursor-pointer"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-[#123a1a]">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-[10px] text-[#123a1a]/45">
                            {item.isExternal ? 'External document' : item.path}
                          </span>
                        </span>
                        {item.isExternal ? (
                          <ExternalLink
                            size={15}
                            className="shrink-0 text-[#123a1a]/30 transition-colors group-hover:text-[#B8933E]"
                          />
                        ) : (
                          <ArrowRight
                            size={15}
                            className="shrink-0 text-[#123a1a]/30 transition-all group-hover:translate-x-0.5 group-hover:text-[#B8933E]"
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}

function EmptyPrompt({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="rounded-3xl border border-[#D4AF37]/25 bg-[#FAF8F3] p-8 text-center">
      <SearchIcon size={26} className="mx-auto mb-3 text-[#B8933E]" />
      <p className="mb-6 text-sm text-[#123a1a]/75">
        Type above to find any page on the site.
      </p>
      <TermChips terms={suggestedTerms} onPick={onPick} />
    </div>
  );
}

function NoResults({
  query,
  onPick,
}: {
  query: string;
  onPick: (q: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-[#D4AF37]/25 bg-[#FAF8F3] p-8 text-center">
      <p className="mb-2 font-serif text-lg font-bold text-[#123a1a]">
        Nothing matched “{query}”
      </p>
      <p className="mb-6 text-sm text-[#123a1a]/70">
        Search covers page and menu names. Try a shorter or more general term.
      </p>
      <TermChips terms={suggestedTerms} onPick={onPick} />
    </div>
  );
}

function TermChips({
  terms,
  onPick,
}: {
  terms: string[];
  onPick: (q: string) => void;
}) {
  if (terms.length === 0) return null;
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {terms.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onPick(t)}
          className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#123a1a] transition-colors hover:border-[#D4AF37] hover:text-[#B8933E] cursor-pointer"
        >
          {t}
        </button>
      ))}
    </div>
  );
}
