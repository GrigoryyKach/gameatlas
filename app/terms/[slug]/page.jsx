"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Skeleton } from '../../../components/ui/skeleton';

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
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const res = await fetch(`/api/termins/${slug}`);
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
      <div className="post container mx-auto">
        <article className="w-full">
          <Skeleton className="h-10 w-2/3 mb-5" />
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-8" />
          <Skeleton className="h-16 w-full mb-2" />
        </article>
      </div>
    );
  };

  return (
    <div className="post container mx-auto mb-14">
      <article className="w-full">
        <h1 className="text-4xl font-bold mb-5">{post.name}</h1>

        {/* author */}
        <p className="text-[#696A75] mb-8">
          {post.author_name}
        </p>

        {/* content */}
        {/* <div className='text-[#BABABF]' dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} /> */}
        <div className='text-[#BABABF]'>
          {renderContent(post.content)}
        </div>
      </article>

      <FaArrowCircleUp
        onClick={scrollToTop}
        className='right-2/4 fixed md:right-auto bottom-5 text-3xl cursor-pointer text-accent hover:text-accent-hover'
      />
    </div>
  );
}
