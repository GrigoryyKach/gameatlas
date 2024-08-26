"use client";

import Link from "next/link";
import Image from "next/image";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', 'month': 'long', day: 'numeric' };
  return date.toLocaleDateString('en-EN', options);
};

const LastPostCard = ({ post }) => {
  const { title, image, genres, slug, created_at } = post;

  const staticGenres = genres.slice(0, 1);

  return (
    <Link
      href={`/posts/${slug}`}
      className="bg-gradient-to-r from-accent/50 relative p-4 xl:p-8 flex flex-col xl:flex-row xl:justify-around items-center xl:gap-8 xl:items- border border-[#242535] rounded-lg hover:shadow-accent/10 hover:shadow-lg hover:scale-105 transition-all"
    >
      <Image
        src={`/${image}`}
        className="w-[360px] object-contain rounded-md mb-4 xl:mb-0"
        alt={title}
        width={360}
        height={240}
      />
      <div className="flex flex-col xl:flex-col-reverse xl:mt-6 items-center">
        <ul className="flex gap-2 mb-4">
          {staticGenres.map((genre, idx) => (
            <li
              key={idx}
              className="py-[4px] px-[10px] text-accent bg-accent bg-opacity-5 rounded-lg text-sm drop-shadow-3xl"
            >
              {genre}
            </li>
          ))}
        </ul>
        <h2 className="font-semibold text-2xl xl:text-6xl mb-5 line-clamp-1 overflow-hidden drop-shadow-3xl">{title}</h2>
  
        <p className="text-[#97989F] xl:absolute right-2 bottom-1">
          {formatDate(created_at)}
        </p>
      </div>
    </Link>
  )
}

export default LastPostCard;
