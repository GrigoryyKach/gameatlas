"use client";

import { useEffect, useState } from "react";

// components
import LastPostCard from "../components/LastPostCard";
import NewsPostCard from "../components/NewsPostCard";
import { Skeleton } from '../components/ui/skeleton';

import { getLastNews, getLastPost } from '../services';

export default function Home() {
  const [lastPost, setLastPost] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getLastPost();
        const postsNode = posts[0];

        const news = await getLastNews();

        setLastPost([postsNode]);
        setLatestNews(news.slice(0, 6));
      } catch (error) {
        console.log('Помилка при завантаженні постів:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="h-full mb-[100px]">
      <div className="container mx-auto h-full">
        <div className='mb-10'>
          <h1 className="text-3xl font-bold mb-4">
            GameAtlas — енциклопедія ігор для справжніх геймерів
          </h1>
          <p className="text-lg text-[#97989F] max-w-4xl">
            Ласкаво просимо на <span className='text-text'>GameAtlas</span> — унікальний український проєкт, де ви знайдете найсвіжіші новини про відеоігри, глибокі огляди, детальні описи жанрів, платформ та улюблених ігор. Наш сайт створено для справжніх геймерів і всіх, хто цікавиться індустрією відеоігор.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-8">Останній пост</h2>
        <ul className="flex flex-col xl:grid grid-cols-1 md:grid-cols-1 items-center gap-[20px] mb-20">
          {isLoading ? (
            <li>
              <Skeleton className="w-full h-64" />
            </li>
          ) : (
            lastPost.length > 0 && (
              <li>
                <LastPostCard post={lastPost[0]} />
              </li>
            )
          )}
        </ul>

        <h2 className="text-2xl font-bold mb-8">Останні Новини</h2>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 items-center gap-[20px]">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="w-full h-64" />
              </li>
            ))
          ) : (
            latestNews.map((newsPost, idx) => {
              return (
                <li key={idx}>
                  <NewsPostCard post={newsPost} />
                </li>
              )
            })
          )}
        </ul>
      </div>
    </section>
  );
}
