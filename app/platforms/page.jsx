"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

// components
import { Skeleton } from '../../components/ui/skeleton';

const Platforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const res = await fetch('/api/platforms');
        const data = await res.json();
        setPlatforms(data);
      } catch (error) {
        console.error('Ошибка при загрузке платформ:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlatforms();
  }, []);

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">Платформи</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 text-center items-center gap-[20px]">
          {isLoading ? (
            Array.from({ length: 21 }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="h-[35px] min-w-[300px]" />
              </li>
            ))
          ) : (
            platforms.map((platform, idx) => {
              return (
                <li key={idx}>
                  <Link
                    href={`/platforms/${platform.slug}`}
                    className='block min-w-[300px] bg-minibg rounded-3xl border-b-2 border-accent/30 hover:border-accent transition-all'
                  >
                    {platform.name}
                  </Link>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </section>
  )
}

export default Platforms;
