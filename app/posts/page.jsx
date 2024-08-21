"use client";

import { useEffect, useState } from "react";

// components
import PostCard from "../../components/PostCard";
import { Skeleton } from '../../components/ui/skeleton';

export default function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();

        const sortedPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setAllPosts(sortedPosts);
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
        <h1 className="text-2xl font-bold mb-8">Все Посты</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 items-center gap-[20px]">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="w-full h-64" />
              </li>
            ))
          ) : (
            allPosts.map((post, idx) => {
              return (
                <li key={idx}>
                  <PostCard post={post} />
                </li>
              )
            })
          )}
        </ul>
      </div>
    </section>
  );
}
