"use client";

import { useEffect, useState } from 'react';

// components
import MiniPostCard from '../../components/MiniPostCard';
import { Skeleton } from '../../components/ui/skeleton';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch('/api/genres');
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        console.error('Ошибка при загрузке жанров:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGenres();
  }, []);

  return (
    <section className="h-full mb-14">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">Жанри</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 text-center items-center gap-[20px]">
          {isLoading ? (
            Array.from({ length: 21 }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="h-[35px] min-w-[300px]" />
              </li>
            ))
          ) : (
            genres.map((genre, idx) => {
              return (
                <li key={idx}>
                  <MiniPostCard post={genre} />
                </li>
              )
            })
          )}
        </ul>
      </div>
    </section>
  )
}

export default Genres;
