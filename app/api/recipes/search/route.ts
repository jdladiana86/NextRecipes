import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
    q
  )}`;

  const upstream = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!upstream.ok)
    return NextResponse.json(
      { error: 'Upstream error' },
      { status: upstream.status }
    );

  const json = await upstream.json();
  return NextResponse.json({ meals: json.meals ?? [] });
}
