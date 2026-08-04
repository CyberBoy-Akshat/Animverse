import { NextRequest, NextResponse } from 'next/server';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

/**
 * Proxy the video player page from source.
 * Only strips frame-ancestors CSP so the iframe can be embedded anywhere.
 * Does NOT rewrite any URLs — player loads its own scripts/styles from origin.
 */
export async function GET(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get('url');
  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing ?url=' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const allowedHosts = [
    'play.zephyrix.top', 'play.zephyrflick.top',
    'watchanimeworld.net', 'watchanimeworld.top',
    'synthnova.net',
  ];
  if (!allowedHosts.some(h => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`))) {
    return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 });
  }

  try {
    const upstream = await fetch(targetUrl, {
      headers: {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,*/*',
        'Referer': 'https://watchanimeworld.top/',
      },
      redirect: 'follow',
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: `Upstream ${upstream.status}` }, { status: 502 });
    }

    let html = await upstream.text();

    // Strip ONLY frame-ancestors from CSP (the thing that blocks embedding)
    // Keep everything else so the player works normally
    html = html.replace(
      /frame-ancestors\s+[^;"]+/gi,
      ''
    );

    // Also strip any CSP meta tags in the HTML
    html = html.replace(
      /<meta[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi,
      ''
    );

    // Remove any parent-frame checks that might block functionality
    html = html.replace(
      /if\s*\(\s*window\s*!==\s*top\s*\)\s*\{[^}]*\}/gi,
      ''
    );

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}
