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
        <h1 className="text-2xl font-bold mb-8">Терміни</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 text-center items-center gap-[20px]">
          {termins.map((termins, idx) => {
            return (
              <li key={idx}>
                <Link
                  href={`/terms/${termins.slug}`}
                  className='block min-w-[300px] bg-minibg rounded-3xl border-b-2 border-accent/30 hover:border-accent transition-all'
                >
                  {termins.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Termins;
