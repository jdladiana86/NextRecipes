import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok)
    return NextResponse.json(
      { error: 'Upstream error' },
      { status: res.status }
    );

  const json = await res.json();
  return NextResponse.json({ categories: json.categories ?? [] });
}
