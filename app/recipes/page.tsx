import { Suspense } from 'react';
import Link from 'next/link';
import { getBaseUrl } from '../_lib/base-url';

// Componente asincrono che legge searchParams e fetcha i risultati
async function Results({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams; // API dinamica asincrona (v15+)
  const origin = await getBaseUrl();
  const url = `${origin}/api/recipes/search?q=${encodeURIComponent(q)}`;

  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) return <p className="text-red-600">Errore nella ricerca.</p>;
  const { meals } = await res.json();

  if (!meals?.length) return <p className="text-gray-600">Nessun risultato.</p>;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {meals.map((m: any) => (
        <li key={m.idMeal} className="border rounded bg-white p-3">
          <Link
            href={`/recipes/${m.idMeal}`}
            className="font-semibold hover:underline">
            {m.strMeal}
          </Link>
          <div className="text-sm text-gray-600">
            {m.strArea} • {m.strCategory}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <>
      <h2 className="text-xl font-bold mb-3">Ricerca ricette</h2>

      {/* Form statico: il defaultValue non deve bloccare il guscio. */}
      <form method="GET" className="mb-4 flex gap-2">
        <input
          name="q"
          placeholder="es. chicken, pasta, arrabiata…"
          className="border px-3 py-2 rounded w-full"
        />
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">
          Cerca
        </button>
      </form>

      {/* Boundary per streammare i risultati senza bloccare la pagina */}
      <Suspense fallback={<div>Carico risultati…</div>}>
        {/* Non fare await qui: passa il Promise */}
        <Results searchParams={searchParams} />
      </Suspense>
    </>
  );
}
