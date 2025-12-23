import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NextRecipes – Next.js 16',
  description: 'Ricette con TheMealDB, caching esplicito e PPR integrato',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
            <Link href="/" className="font-bold">
              NextRecipes
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/recipes">Ricerca</Link>
              <Link href="/categories">Categorie</Link>
              <Link href="/random">Random</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
