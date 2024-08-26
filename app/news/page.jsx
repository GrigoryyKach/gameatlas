"use client";

import { useEffect, useState } from "react";

// components
import PostCard from "../../components/PostCard";
import { Skeleton } from '../../components/ui/skeleton';
import NewsPostCard from "../../components/NewsPostCard";

export default function NewsPage() {
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/News');
        const data = await res.json();

        const sortedPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setAllNews(sortedPosts);
      } catch (error) {
        console.log('Ошибка при загрузке постов:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="h-full mb-14">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">Усі новини</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 items-center gap-[20px]">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="w-full h-64" />
              </li>
            ))
          ) : (
            allNews.map((post, idx) => {
              return (
                <li key={idx}>
                  <NewsPostCard post={post} />
                </li>
              )
            })
          )}
        </ul>
      </div>
    </section>
  );
}
