"use client";

import { useEffect, useState } from "react";

// components
import PostCard from "../../components/PostCard";

export default function Posts() {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
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
    <section className="h-full">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">All Posts</h1>
        <div className="grid grid-cols-3 items-center gap-[20px]">
          {latestPosts.map((post, idx) => {
            return (
              <PostCard key={idx} post={post} />
            )
          })}
        </div>
      </div>
    </section>
  );
}
