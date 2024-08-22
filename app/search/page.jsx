"use client";

import { Suspense } from 'react';
import SearchResults from '../../components/SearchResults';

const SearchPage = () => {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<p>Loading search results...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  )
}

export default SearchPage;
