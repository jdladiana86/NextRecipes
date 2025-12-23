import { refreshRandom } from '@/app/random/actions';

export default async function RandomPage() {
  'use cache';

  const res = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php',
    {
      headers: { Accept: 'application/json' },
      next: { tags: ['random'] }, // tag invalidato dalla Server Action
    }
  );

  if (!res.ok)
    return (
      <p className="text-red-600">
        Errore nel caricamento della ricetta casuale.
      </p>
    );

  const data = await res.json();
  const meal = data?.meals?.[0] ?? null;

  return (
    <>
      <h2 className="text-xl font-bold mb-3">Ricetta casuale</h2>
      {meal ? (
        <div className="border rounded bg-white p-3 mb-4">
          <div className="font-semibold">{meal.strMeal}</div>
          <div className="text-sm text-gray-600">
            {meal.strArea} • {meal.strCategory}
          </div>
        </div>
      ) : (
        <p>Nessuna ricetta.</p>
      )}

      <form action={refreshRandom}>
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">
          Nuova random
        </button>
      </form>
    </>
  );
}
