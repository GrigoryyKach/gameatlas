"use client";

import { useEffect, useState } from "react";

// components
import { IoReloadCircleOutline } from "react-icons/io5";
import { Skeleton } from '../../components/ui/skeleton';
import NewsPostCard from "../../components/NewsPostCard";

import { getNews } from '../../services';

export default function NewsPage() {
  const [allNews, setAllNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const NEWS_PER_PAGE = 9;
  const NEWS_PER_LOAD = 9;

  useEffect(() => {
    async function fetchNews() {
      try {
        const news = await getNews();
        // const newsNode = news[0].node;

        // const res = await fetch('/api/News');
        // const data = await res.json();

        setAllNews(news);
        setVisibleNews(news.slice(0, NEWS_PER_PAGE));
      } catch (error) {
        console.log('Ошибка при загрузке постов:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, []);

  const loadMoreNews = () => {
    const nextPage = currentPage + 1;
    const startIndex = NEWS_PER_PAGE + NEWS_PER_LOAD * (nextPage - 2);
    const endIndex = startIndex + NEWS_PER_LOAD;
    const moreNews = allNews.slice(startIndex, endIndex);

    setVisibleNews([...visibleNews, ...moreNews]);
    setCurrentPage(nextPage);
  };

  return (
    <section className="h-full mb-14">
      <div className="container mx-auto h-full">
        <h1 className="text-2xl font-bold mb-8">Усі новини</h1>
        <ul className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 items-center gap-[20px]">
          {isLoading ? (
            Array.from({ length: NEWS_PER_PAGE }).map((_, idx) => (
              <li key={idx}>
                <Skeleton className="w-full h-64" />
              </li>
            ))
          ) : (
            visibleNews.map((post, idx) => {
              return (
                <li key={idx}>
                  <NewsPostCard post={post} />
                </li>
              )
            })
          )}
        </ul>
        {!isLoading && visibleNews.length < allNews.length && (
          <div className="flex justify-center mt-10">
            <IoReloadCircleOutline
              className="text-4xl cursor-pointer hover:text-accent transition-colors"
              onClick={loadMoreNews}
            />
          </div>
        )}
      </div>
    </section>
  );
}
