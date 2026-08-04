import { scrapeHome } from '@/lib/scraper';
import SeriesCard from '@/components/SeriesCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await scrapeHome();

  const sections = [
    { title: 'Newest Drops', icon: '🔥', items: data.newestDrops, gradient: 'from-violet-500 to-pink-500' },
    { title: 'Most Watched', icon: '⭐', items: data.mostWatchedSeries, gradient: 'from-amber-500 to-orange-500' },
    { title: 'New Arrivals', icon: '✨', items: data.newArrivals, gradient: 'from-cyan-500 to-blue-500' },
    { title: 'Movies', icon: '🎬', items: data.mostWatchedMovies, gradient: 'from-emerald-500 to-teal-500' },
  ].filter(s => s.items.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      {/* Hero */}
      <section className="mb-16 text-center fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Live — Data scraped in real-time
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          <span className="text-white">Anime</span>
          <span className="gradient-text">World</span>
        </h1>
        <p className="text-zinc-500 text-base sm:text-lg max-w-md mx-auto">
          Stream anime with embedded players. No database, no pre-scraping — fresh every time.
        </p>
      </section>

      {/* Sections */}
      {sections.map((section, si) => (
        <section key={section.title} className="mb-14 fade-up" style={{ animationDelay: `${si * 100}ms` }}>
          <div className="section-title">
            <span>{section.icon} {section.title}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {section.items.map((item, i) => (
              <SeriesCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        </section>
      ))}

      {sections.length === 0 && (
        <div className="text-center py-24 text-zinc-500">
          <svg className="w-20 h-20 mx-auto mb-4 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-lg font-medium">Could not load data</p>
          <p className="text-sm text-zinc-600 mt-1">The source site may be temporarily unavailable</p>
        </div>
      )}
    </div>
  );
}
