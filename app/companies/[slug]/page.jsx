"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { renderContent } from '../../../lib/renderContent';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Skeleton } from '../../../components/ui/skeleton';

export default function PostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const res = await fetch(`/api/companies/${slug}`);

        if (res.status === 404) {
          router.replace('/404');
          return;
        }

        const data = await res.json();

        if (!data) {
          router.replace('/404');
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке поста:', error);
        router.replace('/404');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [slug, router]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (isLoading) {
    return (
      <div className="post container mx-auto flex flex-col-reverse md:flex-row gap-8 mb-14">
        <article className="w-full md:w-5/6">
          <Skeleton className="h-10 w-2/3 mb-5" />
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-8" />
          <Skeleton className="h-96 w-full mb-2" />
          <Skeleton className="h-56 w-full mb-2" />
          <Skeleton className="h-6 w-2/3 mb-2" />
        </article>
        <aside className="w-full md:w-1/4 flex-shrink-0">
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
        </aside>
      </div>
    );
  };

  if (!post) {
    return null;
  }

  return (
    <div className="post container mx-auto flex flex-col-reverse md:flex-row gap-8 mb-14">
      {/* Основной контент */}
      <article className="w-full md:w-5/6">
        <h1 className="text-4xl font-bold mb-5">{post.name}</h1>

        {/* date */}
        <p className="text-[#696A75] mb-8">
          {post.author_name}
        </p>

        {/* content */}
        <div className='text-[#BABABF] post-content'>
          {renderContent(post.content)}
        </div>
      </article>

      {/* Боковая колонка */}
      <aside className="w-full md:w-1/4 flex-shrink-0 ">
        <div className="sticky top-20">
          <h2 className="text-2xl font-semibold mb-4">Информація</h2>
          <p className='text-[#BABABF]'><span className='font-bold text-white'>Дата заснування:</span> {post.open_date}</p>
        </div>

        <FaArrowCircleUp
          onClick={scrollToTop}
          className='right-2/4 fixed md:sticky md:top-52 md:bottom-0 bottom-5 text-3xl cursor-pointer text-accent hover:text-accent-hover'
        />
      </aside>
    </div>
  );
}
