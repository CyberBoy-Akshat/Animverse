import { scrapeEpisode } from '@/lib/scraper';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import VideoPlayer from '@/components/VideoPlayer';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const data = await scrapeEpisode(slug);
    return { title: `${data.title} — AnimeWorld` };
  } catch { 
    return { title: 'Not Found — AnimeWorld' }; 
  }
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let data;
  try {
    data = await scrapeEpisode(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-5 fade-up">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/series/${data.seriesSlug}`} className="hover:text-zinc-300 transition-colors">
          {data.seriesTitle}
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{data.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight fade-up">{data.title}</h1>

          {/* Player */}
          <div className="fade-up fade-up-delay-1">
            <VideoPlayer servers={data.servers} />
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-5 fade-up fade-up-delay-2">
            {data.prevEp ? (
              <Link
                href={`/episode/${data.prevEp}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Link>
            ) : <div />}
            <Link
              href={`/series/${data.seriesSlug}`}
              className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/10 transition-all"
            >
              All Episodes
            </Link>
            {data.nextEp ? (
              <Link
                href={`/episode/${data.nextEp}`}
                className="btn-glow text-sm flex items-center gap-2"
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : <div />}
          </div>

          {/* Info card */}
          <div className="glass rounded-xl p-5 mt-6 fade-up fade-up-delay-3">
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Episode Info
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-600">Series</span>
                <Link href={`/series/${data.seriesSlug}`} className="block text-violet-400 hover:underline mt-0.5">
                  {data.seriesTitle}
                </Link>
              </div>
              <div>
                <span className="text-zinc-600">Episode</span>
                <p className="text-zinc-300 mt-0.5">{data.seasonEp}</p>
              </div>
              <div>
                <span className="text-zinc-600">Servers</span>
                <p className="text-zinc-300 mt-0.5">{data.servers.length} available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
