"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const getLinkPath = (table, slug) => {
  switch (table) {
    case 'Post':
      return `/posts/${slug}`;
    case 'Term':
      return `/terms/${slug}`;
    case 'Genre':
      return `/genres/${slug}`;
    case 'Platform':
      return `/platforms/${slug}`;
    case 'Company':
      return `/companies/${slug}`;
    default:
      return `/`;
  }
};

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      async function fetchResults() {
        try {
          const res = await fetch(`/api/search?term=${query}`);
          const data = await res.json();
          setResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchResults();
    }
  }, [query]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Результати пошуку за словом "{query}"</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul className="list-disc pl-5">
          {results.map((result, idx) => (
            <li key={idx}>
              <Link
                href={`${getLinkPath(result.source, result.slug)}`}
                className='text-accent hover:text-accent-hover'
              >
                {result.title} ({result.source})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нічого не знайдено</p>
      )}
    </>
  )
}

export default SearchResults;
