import type { ReactNode } from 'react';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="page">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
}
