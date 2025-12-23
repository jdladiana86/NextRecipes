import { getBaseUrl } from '@/app/_lib/base-url';
import { Suspense } from 'react';

async function RecipeDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ await dentro child
  const origin = await getBaseUrl(); // ✅ origin assoluto
  const url = `${origin}/api/recipes/detail?id=${encodeURIComponent(id)}`;

  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok)
    return (
      <p className="text-red-600">Errore nel caricamento della ricetta.</p>
    );
  const { meal } = await res.json();

  if (!meal) return <p>Ricetta non trovata.</p>;

  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    name: meal[`strIngredient${i + 1}`],
    measure: meal[`strMeasure${i + 1}`],
  })).filter(x => x.name);

  return (
    <>
      <h2 className="text-xl font-bold mb-3">{meal.strMeal}</h2>
      <div className="text-sm text-gray-600 mb-3">
        {meal.strArea} • {meal.strCategory}
      </div>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded mb-4"
      />
      <h3 className="font-semibold">Ingredienti</h3>
      <ul className="list-disc ml-6 mb-4">
        {ingredients.map((ing, idx) => (
          <li key={idx}>
            {ing.name} {ing.measure ? `– ${ing.measure}` : ''}
          </li>
        ))}
      </ul>
      <h3 className="font-semibold">Istruzioni</h3>
      <p className="whitespace-pre-wrap">{meal.strInstructions}</p>
    </>
  );
}

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div>Carico ricetta…</div>}>
      <RecipeDetailContent params={params} />
    </Suspense>
  );
}
