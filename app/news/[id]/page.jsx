"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Image from 'next/image';

import { renderContent } from '../../../lib/renderContent';
import { formatDate } from '../../../lib/formatDate';

import { FaArrowCircleUp } from "react-icons/fa";
import { Skeleton } from '../../../components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

export default function PostPage() {
  const [api, setApi] = useState();
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    async function fetchPost() {
      try {
        const res = await fetch(`/api/news/${id}`);

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
  }, [id, router]);

  useEffect(() => {
    if (!api) {
      return
    }

    api.scrollTo(currentIndex);
  }, [currentIndex, api]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          src={`https://drive.google.com/uc?export=view&id=${post.image}`}
          width={450}
          height={200}
          className='rounded-xl'
        />
      </div>
      {/* Основной контент */}
      <article className="w-full">
        <h1 className="text-4xl font-bold mb-5">{post.title}</h1>

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

      {!!post.additional_images.length && (
        <div className='flex flex-col justify-center relative mx-auto w-full max-w-4xl'>
          <Carousel
            setApi={setApi}
            className="flex justify-center items-center relative"
          >
            <CarouselContent>
              {post.additional_images.map((img, idx) => (
                <CarouselItem
                  key={idx}
                  className="flex justify-center items-center"
                >
                  <Image
                    src={`https://drive.google.com/uc?export=view&id=${img}`}
                    alt={`Image ${idx + 1}`}
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white hover:text-accent" />
            <CarouselNext
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white hover:text-accent" />
          </Carousel>
          <div className="hidden md:flex justify-center mt-4 gap-1">
            {post.additional_images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`box-border p-1 ${currentIndex === idx ? 'border-2 border-accent' : ''}`}
              >
                <Image
                  src={`https://drive.google.com/uc?export=view&id=${img}`}
                  width={100}
                  height={60}
                  alt={`Thumbnail ${idx + 1}`}
                  className="box-border object-cover max-h-[60px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {!!post.video_url && (
        <div className='max-w-[800px]'>
          <YouTube videoId={post.video_url.split('v=')[1]} opts={videoOptions} />
        </div>
      )}
    </div>
  );
}
