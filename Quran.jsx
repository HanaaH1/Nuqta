import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ChevronRight } from 'lucide-react';
import { SURAHS } from '../lib/surahs';
import { cn } from '@/lib/utils';

export default function Quran() {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? SURAHS.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.meaning.toLowerCase().includes(query.toLowerCase()) ||
        String(s.id).includes(query)
      )
    : SURAHS;

  return (
    <div className="pt-12 pb-6 min-h-screen">
      <div className="px-6">
        <h1 className="text-2xl font-bold text-foreground">Quran</h1>
        <p className="text-sm text-muted-foreground mt-1">114 Surahs · +2 BP per ayah read</p>
      </div>

      {/* Search */}
      <div className="px-6 mt-4">
        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search surah name or number…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
          />
        </div>
      </div>

      {/* Surah list */}
      <div className="px-6 mt-4 space-y-2">
        {filtered.map(surah => (
          <Link
            key={surah.id}
            to={`/quran/${surah.id}`}
            className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-all active:scale-[0.98]"
          >
            {/* Number badge */}
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">{surah.id}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{surah.name}</p>
                <p className="text-lg font-arabic text-foreground/70 shrink-0">{surah.arabic}</p>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-muted-foreground">{surah.meaning}</p>
                <span className="text-muted-foreground/40 text-xs">·</span>
                <p className="text-xs text-muted-foreground">{surah.ayahCount} ayahs</p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}