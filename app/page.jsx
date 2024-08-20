"use client";

import { useEffect, useState } from "react";

// components
import PostCard from "../components/PostCard";

export default function Home() {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/latest-posts');
        const data = await res.json();

        const sortedPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setLatestPosts(sortedPosts);
      } catch (error) {
        console.log('Ошибка при загрузке постов:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="h-full mb-14">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">Latest Posts</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 items-center gap-[20px]">
          {latestPosts.map((post, idx) => {
            return (
              <li key={idx}>
                <PostCard post={post} />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  );
}
