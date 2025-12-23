import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
    id
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
  return NextResponse.json({ meal: json.meals?.[0] ?? null });
}
