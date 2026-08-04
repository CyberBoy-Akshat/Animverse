'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { EpisodeCard, SeasonInfo } from '@/lib/scraper';

interface Props {
  episodes: EpisodeCard[];
  seasons: SeasonInfo[];
  currentSlug: string;
  seriesSlug: string;
}

export default function EpisodeSidebar({ episodes, seasons, currentSlug }: Props) {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(
    seasons.length > 0 ? seasons[seasons.length - 1].number : null
  );

  const filteredEps = selectedSeason !== null
    ? episodes.filter(ep => {
        const m = ep.slug.match(/(\d+)x\d+/);
        return m ? parseInt(m[1]) === selectedSeason : true;
      })
    : episodes;

  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="glass rounded-xl overflow-hidden sticky top-20">
        {/* Header */}
        <div className="p-4 border-b border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Episodes
            <span className="ml-auto text-[10px] text-zinc-500 font-normal">{filteredEps.length}</span>
          </h3>
        </div>

        {/* Season tabs */}
        {seasons.length > 1 && (
          <div className="flex flex-wrap gap-1.5 p-3 border-b border-white/[0.06] bg-white/[0.01]">
            {seasons.map(s => (
              <button
                key={s.number}
                onClick={() => setSelectedSeason(s.number)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  selectedSeason === s.number
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    : 'bg-white/[0.03] text-zinc-500 border border-transparent hover:text-zinc-300'
                }`}
              >
                S{s.number}
              </button>
            ))}
          </div>
        )}

        {/* Episodes */}
        <div className="max-h-[60vh] overflow-y-auto">
          {filteredEps.map(ep => {
            const isActive = ep.slug === currentSlug;
            return (
              <Link
                key={ep.slug}
                href={`/episode/${ep.slug}`}
                className={`flex items-center gap-3 px-4 py-3 text-sm border-b border-white/[0.03] transition-all duration-200 ${
                  isActive
                    ? 'bg-violet-500/10 border-l-2 border-l-violet-500 text-violet-300'
                    : 'text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200 border-l-2 border-l-transparent'
                }`}
              >
                <svg className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-violet-400' : 'text-zinc-700'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="truncate text-xs">{ep.title}</span>
              </Link>
            );
          })}
          {filteredEps.length === 0 && (
            <p className="text-zinc-600 text-xs text-center py-6">No episodes</p>
          )}
        </div>
      </div>
    </aside>
  );
}
