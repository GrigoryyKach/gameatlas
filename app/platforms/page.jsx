"use client";

import { useEffect, useState } from 'react';

// components
import MiniPostCard from '../../components/MiniPostCard';
import { Skeleton } from '../../components/ui/skeleton';

import { getPlatforms } from '../../services';

const Platforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const platforms = await getPlatforms();
        console.log(platforms)

        setPlatforms(platforms);
      } catch (error) {
        console.error('Помилка при завантаженні платформ:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlatforms();
  }, []);

  return (
    <section className="h-full mb-14">
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
                  <MiniPostCard post={platform} />
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
