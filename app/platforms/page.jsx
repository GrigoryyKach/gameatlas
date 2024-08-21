"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Platforms = () => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const res = await fetch('/api/platforms');
        const data = await res.json();
        setPlatforms(data);
      } catch (error) {
        console.error('Ошибка при загрузке платформ:', error);
      }
    }
    fetchPlatforms();
  }, []);

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">Платформы</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 text-center items-center gap-[20px]">
          {platforms.map((platform, idx) => {
            return (
              <li key={idx}>
                <Link href={`/platforms/${platform.slug}`}>
                  {platform.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Platforms;
