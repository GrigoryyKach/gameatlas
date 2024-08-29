"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { renderContent } from '../../../lib/renderContent';
import { formatDate } from '../../../lib/formatDate';
import { slugify } from '../../../lib/slugify';

import { FaArrowCircleUp } from "react-icons/fa";
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
        const res = await fetch(`/api/posts/${slug}`);

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
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-3/4 mb-2" />
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
        <h1 className="text-4xl font-bold mb-5">{post.title}</h1>

        {/* genres */}
        <ul className="flex gap-2 mb-4">
          {post.genres.map((genre, idx) => (
            <li
              key={idx}
            >
              <a
                href={`/genres/${slugify(genre)}`}
                className='block py-[6px] px-[12px] bg-minibg rounded-lg text-sm border-b-2 border-accent/30 hover:border-accent transition-all'
              >
                {genre}
              </a>
            </li>
          ))}
        </ul>

        {/* author & date */}
        <div className='flex flex-row mb-8 gap-4 items-center'>
          <p className="text-[#696A75]">
            {post.author_name}
          </p>
          |
          <p className='text-[#696A75]'>
            {formatDate(post.created_at)}
          </p>
        </div>

        {/* content */}
        {/* <div className='text-[#BABABF]' dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} /> */}
        <div className='text-text'>
          {renderContent(post.content)}
        </div>
      </article>

      {/* Боковая колонка */}
      <aside className="w-full md:w-1/4 flex-shrink-0 relative">
        <div className="sticky md:top-12 xl:top-20">
          <h2 className="text-2xl font-semibold mb-4">Информація</h2>
          <p className='text-text'><span className='font-bold text-white'>Дата виходу:</span> {post.release_date}</p>
          <p className='text-text'><span className='font-bold text-white'>Розробники:</span> { }
            <a
              href={`/companies/${slugify(post.developers)}`}
              className='text-accent hover:text-accent-hover'
            >
              {post.developers}
            </a>
          </p>
          <p className='text-text'><span className='font-bold text-white'>Видавець:</span> { }
            <a
              href={`/companies/${slugify(post.publisher)}`}
              className='text-accent hover:text-accent-hover'
            >
              {post.publisher}
            </a>
          </p>
          <span className='font-bold'>Платформи: </span>
          <ul className='inline'>
            {post.platforms.map((platform, idx) => (
              <li
                key={idx}
                className='inline'
              >
                <a
                  href={`/platforms/${slugify(platform)}`}
                  className='text-accent hover:text-accent-hover'
                >
                  {platform}
                </a>
                {idx < post.platforms.length - 1 && <span>, </span>}
              </li>
            ))}
          </ul>
        </div>
        <FaArrowCircleUp
          onClick={scrollToTop}
          className='right-2/4 fixed md:sticky md:top-[360px] md:bottom-0 bottom-5 text-3xl cursor-pointer text-accent hover:text-accent-hover'
        />
      </aside>

    </div>
  );
}
