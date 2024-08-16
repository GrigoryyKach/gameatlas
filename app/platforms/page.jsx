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
      <h1 className="text-2xl font-bold mb-8">All Platforms</h1>
        <div className="grid grid-cols-3 items-center gap-[20px]">
          {platforms.map((platform, idx) => {
            return (
              <Link href={`/platforms/${platform.slug}`} key={idx}>{platform.name}</Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Platforms;
