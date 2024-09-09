"use client";

import { useEffect, useState } from 'react';

// components
import MiniPostCard from '../../components/MiniPostCard';
import { Skeleton } from '../../components/ui/skeleton';

import { getTerms } from '../../services';

const Termins = () => {
  const [terms, setTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTermins() {
      try {
        const terms = await getTerms();

        // const res = await fetch('/api/termins');
        // const data = await res.json();
        setTerms(terms);
      } catch (error) {
        console.error('Ошибка при загрузке терминов:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTermins();
  }, []);

  return (
    <section className="h-full mb-14">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">Терміни</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 text-center items-center gap-[20px]">
          {isLoading ? (
            Array.from({ length: 21 }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="h-[35px] min-w-[300px]" />
              </li>
            ))
          ) : (
            terms.map((termin, idx) => {
              return (
                <li key={idx}>
                  <MiniPostCard post={termin} />
                </li>
              )
            })
          )}
        </ul>
      </div>
    </section>
  )
}

export default Termins;
