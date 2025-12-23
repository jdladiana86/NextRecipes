// app/page.tsx
export default async function Home() {
  'use cache'; // caching esplicito: PPR integrato con Cache Components
  return (
    <>
      <h1 className="text-2xl font-bold">
        Ciao Javi, benvenuto su NextRecipes
      </h1>
      <p className="text-gray-600">
        Cerca ricette, esplora categorie e prova una ricetta casuale.
      </p>
    </>
  );
}
