import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';

export function HomePage() {
  return (
    <main>
      <Hero />
      <section id="features">
        <Features />
      </section>
    </main>
  );
}