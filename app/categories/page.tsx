export default async function CategoriesPage() {
  'use cache'; // caching esplicito (PPR integrato)

  const res = await fetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php',
    {
      headers: { Accept: 'application/json' },
      next: { tags: ['categories'] }, // tag per revalidation mirata
    }
  );

  if (!res.ok)
    return (
      <p className="text-red-600">Errore nel caricamento delle categorie.</p>
    );

  const data = await res.json();
  const categories = data?.categories ?? [];

  return (
    <>
      <h2 className="text-xl font-bold mb-3">Categorie</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((c: any) => (
          <li key={c.idCategory} className="border rounded bg-white p-3">
            <div className="font-semibold">{c.strCategory}</div>
            <div className="text-sm text-gray-600">
              {c.strCategoryDescription?.slice(0, 80)}…
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
``;
