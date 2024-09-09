"use client";

import { useEffect, useState } from "react";

import { getPosts } from "../../services";

// components
import { IoReloadCircleOutline } from "react-icons/io5";
import PostCard from "../../components/PostCard";
import { Skeleton } from '../../components/ui/skeleton';

export default function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 12;
  const POSTS_PER_LOAD = 9;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getPosts();
        
        // const postsNode = posts[0].node;
        // const res = await fetch('/api/posts');
        // const data = await res.json();

        
        setAllPosts(posts);
        setVisiblePosts(posts.slice(0, POSTS_PER_PAGE));
      } catch (error) {
        console.log('Ошибка при загрузке постов:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);
  // console.log(visiblePosts);

  const loadMorePosts = () => {
    const nextPage = currentPage + 1;
    const startIndex = POSTS_PER_PAGE + POSTS_PER_LOAD * (nextPage - 2);
    const endIndex = startIndex + POSTS_PER_LOAD;
    const morePosts = allPosts.slice(startIndex, endIndex);

    setVisiblePosts([...visiblePosts, ...morePosts]);
    setCurrentPage(nextPage);
  };

  return (
    <section className="h-full mb-14">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">Усі пости</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 items-center gap-[20px]">
          {isLoading ? (
            Array.from({ length: POSTS_PER_PAGE }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="w-full h-64" />
              </li>
            ))
          ) : (
            visiblePosts.map((post, idx) => {
              return (
                <li key={idx}>
                  <PostCard post={post} />
                </li>
              )
            })
          )}
        </ul>
        {!isLoading && visiblePosts.length < allPosts.length && (
          <div className="flex justify-center mt-10">
            <IoReloadCircleOutline
              className="text-4xl cursor-pointer hover:text-accent transition-colors"
              onClick={loadMorePosts}
            />
          </div>
        )}
      </div>
    </section>
  );
}
