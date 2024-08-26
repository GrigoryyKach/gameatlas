"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Image from 'next/image';

import { FaArrowCircleUp } from "react-icons/fa";
import { Skeleton } from '../../../components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', 'month': 'long', day: 'numeric' };
  return date.toLocaleDateString('en-EN', options);
};

const renderContent = (content) => {
  return content.map((node, index) => {
    if (node.type === 'paragraph') {
      return (
        <p key={index}>
          {node.children.map((child, idx) => {
            let textElement = child.text;

            if (child.type === 'link') {
              return (
                <a key={idx} href={child.href} className="text-accent hover:text-accent-hover">
                  {child.children.map((linkChild) => linkChild.text).join('')}
                </a>
              );
            }

            if (child.bold) {
              textElement = <strong key={idx}>{textElement}</strong>;
            }

            if (child.italic) {
              textElement = <em key={idx}>{textElement}</em>;
            }

            return textElement;
          })}
        </p>
      );
    }

    if (node.type === 'heading') {
      const HeadingTag = `h${node.level}`;
      return (
        <HeadingTag key={index} className={`text-${node.level}xl font-bold my-4`}>
          {node.children.map((child) => child.text).join('')}
        </HeadingTag>
      );
    }

    if (node.type === 'divider') {
      return <br key={index} />;
    }

    if (node.type === 'ordered-list' || node.type === 'unordered-list') {
      const ListTag = node.type === 'ordered-list' ? 'ol' : 'ul';
      return (
        <ListTag key={index} className={`${node.type === 'ordered-list' ? 'list-decimal' : 'list-disc'} text-white list-inside ml-3`}>
          {node.children.map((listItem, idx) => (
            <li key={idx}>
              {listItem.children[0].children.map((listItemChild, childIdx) => {
                if (listItemChild.type === 'link') {
                  return (
                    <a key={childIdx} href={listItemChild.href} className="text-accent hover:text-accent-hover">
                      {listItemChild.children.map((linkChild) => linkChild.text).join('')}
                    </a>
                  );
                }
                return listItemChild.text;
              })}
            </li>
          ))}
        </ListTag>
      );
    }

    return null;
  });
};

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
          src={`/${post.image}`}
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
                    src={`/${img}`}
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
                  src={`/${img}`}
                  width={100}
                  height={67}
                  alt={`Thumbnail ${idx + 1}`}
                  className="box-border object-cover"
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