"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Image from 'next/image';

import { getNewsDetails } from '../../../services';

import { renderContent } from '../../../lib/renderContent';
import { formatDate } from '../../../lib/formatDate';

import { Skeleton } from '../../../components/ui/skeleton';
import {CustomCarousel} from "../../../components/CustomCarousel"

export default function PostPage() {
  const [api, setApi] = useState();
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const data = await getNewsDetails(slug);

        if (!data) {
          router.replace('/404');
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error('Помилка при завантаженні посту:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [slug, router]);

  useEffect(() => {
    if (!api) {
      return
    }

    api.scrollTo(currentIndex);
  }, [currentIndex, api]);

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
      </div>
    );
  };

  if (!post) {
    return null;
  }

  const videoOptions = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="post container mx-auto flex flex-col gap-6 mb-14">
      <div className='flex items-center justify-center'>
        <Image
          src={post.image.url}
          width={450}
          height={200}
          className='rounded-xl'
          alt={post.title}
        />
      </div>
      {/* main */}
      <article className="w-full">
        <h1 className="text-4xl font-bold mb-5">{post.title}</h1>

        {/* author & date */}
        <div className='flex flex-row mb-8 gap-4 items-center'>
          <p className="text-[#696A75]">
            {post.author.name}
          </p>
          |
          <p className='text-[#696A75]'>
            {formatDate(post.created_at)}
          </p>
        </div>

        {/* content */}
        <div className='text-text post-content'>
          {renderContent(post.content.raw.children)}
        </div>
      </article>

      {!!post.additional_images.length && (
        <CustomCarousel
    images={post.additional_images.map((img) => ({ url: img.url }))}
  />
      )}

      {!!post.video_url && (
        <div className='max-w-[800px]'>
          <YouTube videoId={post.video_url.split('v=')[1]} opts={videoOptions} />
        </div>
      )}
    </div>
  );
}
