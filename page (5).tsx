import { NextRequest, NextResponse } from 'next/server';

// Proxy images from the source site to avoid CORS/hotlink issues
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'Missing url param' }, { status: 400 });

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://watchanimeworld.top/',
      },
    });

    if (!res.ok) return NextResponse.json({ error: `Upstream ${res.status}` }, { status: 502 });

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const body = await res.arrayBuffer();

    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}
