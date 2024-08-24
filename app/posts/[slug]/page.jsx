"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FaArrowCircleUp } from "react-icons/fa";
import { Skeleton } from '../../../components/ui/skeleton';

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

const slugify = (text) => {
  return text
    .toLowerCase() // Привести к нижнему регистру
    .replace(/'/g, '-') // Заменить одиночные кавычки на тире
    .replace(/\s+/g, '-') // Заменить пробелы на тире
    .replace(/[^\w\-]+/g, '') // Удалить все не буквенно-цифровые символы
    .replace(/\-\-+/g, '-') // Заменить несколько тире на одно
    .trim(); // Удалить начальные и конечные тире
};

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Ошибка при загрузке поста:', error);
      }
    }

    fetchPost();
  }, [slug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!post) {
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
        <div className="sticky top-20">
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
          className='right-2/4 fixed md:right-auto bottom-5 text-3xl cursor-pointer text-accent hover:text-accent-hover'
        />
      </aside>

    </div>
  );
}
