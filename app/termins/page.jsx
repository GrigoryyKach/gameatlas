"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Termins = () => {
  const [termins, setTermins] = useState([]);

  useEffect(() => {
    async function fetchTermins() {
      try {
        const res = await fetch('/api/termins');
        const data = await res.json();
        setTermins(data);
      } catch (error) {
        console.error('Ошибка при загрузке терминов:', error);
      }
    }
    fetchTermins();
  }, []);

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
      <h1 className="text-2xl font-bold mb-8">All Termins</h1>
        <div className="grid grid-cols-3 items-center gap-[20px]">
          {termins.map((termins, idx) => {
            return (
              <Link href={`/termins/${termins.slug}`} key={idx}>{termins.name}</Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Termins;
