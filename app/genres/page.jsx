"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Genres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch('/api/genres');
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        console.error('Ошибка при загрузке жанров:', error);
      }
    }
    fetchGenres();
  }, []);

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">All Genres</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 text-center items-center gap-[20px]">
          {genres.map((genre, idx) => {
            return (
              <li key={idx}>
                <Link href={`/genres/${genre.slug}`}>
                  {genre.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Genres;
