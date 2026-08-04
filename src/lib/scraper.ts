export interface EpisodeCard {
  slug: string;
  title: string;
}

export interface SeasonInfo {
  number: number;
  slug?: string;
}

export interface ScrapedEpisodeData {
  slug: string;
  title: string;
  seriesSlug: string;
  seriesTitle: string;
  seasonEp: string;
  servers: { name: string; url: string }[];
  episodes: EpisodeCard[];
  seasons: SeasonInfo[];
  prevEp?: string;
  nextEp?: string;
}

export interface ScrapedSeriesData {
  slug: string;
  title: string;
  description: string;
  poster: string;
  genres: string[];
  status: string;
  releaseYear: number;
  seasons: SeasonInfo[];
  episodes: EpisodeCard[];
}

const CACHE = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getFromCache<T>(key: string): T | null {
  const cached = CACHE.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  CACHE.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  CACHE.set(key, { data, timestamp: Date.now() });
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';
const BASE_URL = 'https://watchanimeworld.top';

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': 'text/html,application/xhtml+xml,*/*',
      'Referer': BASE_URL + '/',
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

export async function scrapeEpisode(slug: string): Promise<ScrapedEpisodeData> {
  const cacheKey = `episode:${slug}`;
  const cached = getFromCache<ScrapedEpisodeData>(cacheKey);
  if (cached) return cached;

  const html = await fetchHtml(`${BASE_URL}/episode/${slug}`);
  const cheerio = await import('cheerio');
  const $ = cheerio.load(html);

  const title = $('h1').first().text().trim() || slug;
  const seriesTitle = $('.breadcrumb a').last().prev().text().trim() || 'Unknown Series';
  const seriesSlug = $('.breadcrumb a').last().prev().attr('href')?.split('/').pop() || '';
  
  const seasonEp = $('.info-row:contains("Episode")').text().trim() || slug;

  const servers: { name: string; url: string }[] = [];
  $('.server-select option').each((_, el) => {
    const url = $(el).attr('value');
    const name = $(el).text().trim();
    if (url) servers.push({ name, url });
  });

  // Fallback: look for iframe sources
  if (servers.length === 0) {
    $('iframe').each((_, el) => {
      const src = $(el).attr('src');
      if (src && src.startsWith('http')) {
        servers.push({ name: `Server ${servers.length + 1}`, url: src });
      }
    });
  }

  const episodes: EpisodeCard[] = [];
  $('.episode-list a').each((_, el) => {
    const epSlug = $(el).attr('href')?.split('/').pop();
    const epTitle = $(el).text().trim();
    if (epSlug) episodes.push({ slug: epSlug, title: epTitle });
  });

  const seasons: SeasonInfo[] = [];
  $('.season-select option').each((_, el) => {
    const num = parseInt($(el).attr('value') || '0');
    if (num) seasons.push({ number: num });
  });

  const allEpLinks: string[] = [];
  $('.episode-links a').each((_, el) => {
    const href = $(el).attr('href');
    if (href) allEpLinks.push(href);
  });
  
  const currentIndex = allEpLinks.findIndex(h => h.includes(slug));
  const prevEp = currentIndex > 0 ? allEpLinks[currentIndex - 1].split('/').pop() : undefined;
  const nextEp = currentIndex < allEpLinks.length - 1 ? allEpLinks[currentIndex + 1].split('/').pop() : undefined;

  const data: ScrapedEpisodeData = {
    slug,
    title,
    seriesSlug,
    seriesTitle,
    seasonEp,
    servers,
    episodes,
    seasons,
    prevEp,
    nextEp,
  };

  setCache(cacheKey, data);
  return data;
}

export async function scrapeSeries(slug: string): Promise<ScrapedSeriesData> {
  const cacheKey = `series:${slug}`;
  const cached = getFromCache<ScrapedSeriesData>(cacheKey);
  if (cached) return cached;

  const html = await fetchHtml(`${BASE_URL}/series/${slug}`);
  const cheerio = await import('cheerio');
  const $ = cheerio.load(html);

  const title = $('h1').first().text().trim() || slug;
  const description = $('.synopsis').text().trim() || 'No description available.';
  const poster = $('.poster img').attr('src') || '/placeholder.jpg';
  
  const genres: string[] = [];
  $('.genres span').each((_, el) => {
    const genre = $(el).text().trim();
    if (genre) genres.push(genre);
  });

  const infoText = $('.info-row').text();
  const statusMatch = infoText.match(/Status:\s*(.+)/i);
  const yearMatch = infoText.match(/(\d{4})/);
  
  const status = statusMatch ? statusMatch[1].trim() : 'Ongoing';
  const releaseYear = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();

  const episodes: EpisodeCard[] = [];
  $('.episode-card a').each((_, el) => {
    const epSlug = $(el).attr('href')?.split('/').pop();
    const epTitle = $(el).text().trim();
    if (epSlug) episodes.push({ slug: epSlug, title: epTitle });
  });

  const seasons: SeasonInfo[] = [];
  $('.season-tab').each((_, el) => {
    const num = parseInt($(el).data('season') || '1');
    seasons.push({ number: num });
  });

  const data: ScrapedSeriesData = {
    slug,
    title,
    description,
    poster,
    genres,
    status,
    releaseYear,
    seasons,
    episodes,
  };

  setCache(cacheKey, data);
  return data;
}

export async function searchAnime(query: string): Promise<ScrapedSeriesData[]> {
  const cacheKey = `search:${query}`;
  const cached = getFromCache<ScrapedSeriesData[]>(cacheKey);
  if (cached) return cached;

  const encodedQuery = encodeURIComponent(query);
  const html = await fetchHtml(`${BASE_URL}/search?q=${encodedQuery}`);
  const cheerio = await import('cheerio');
  const $ = cheerio.load(html);

  const results: ScrapedSeriesData[] = [];

  $('.anime-card').each((_, el) => {
    const slug = $(el).find('a').attr('href')?.split('/').pop();
    const title = $(el).find('.title').text().trim();
    const poster = $(el).find('img').attr('src') || '/placeholder.jpg';
    
    if (slug && title) {
      results.push({
        slug,
        title,
        description: '',
        poster,
        genres: [],
        status: 'Unknown',
        releaseYear: 0,
        seasons: [],
        episodes: [],
      });
    }
  });

  setCache(cacheKey, results);
  return results;
}
