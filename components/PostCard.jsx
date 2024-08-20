"use client";

import Link from "next/link";
import Image from "next/image";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', 'month': 'long', day: 'numeric' };
  return date.toLocaleDateString('en-EN', options);
};

const PostCard = ({ post }) => {
  const { title, image, genres, slug, created_at } = post;

  const staticGenres = genres.slice(0, 2);

  return (
    <Link
      href={`/posts/${slug}`}
      className="p-4 flex flex-col items-center border border-[#242535] rounded-lg hover:shadow-accent/10 hover:shadow-lg hover:scale-105 transition-all"
    >
      <Image
        src={`/${image}`}
        className="w-[360px] object-contain rounded-md mb-4 flex"
        alt={title}
        width={360}
        height={240}
      />
      <ul className="flex gap-2 mb-4">
        {staticGenres.map((genre, idx) => (
          <li
            key={idx}
            className="py-[4px] px-[10px] text-accent bg-accent bg-opacity-5 rounded-lg text-sm"
          >
            {genre}
          </li>
        ))}
      </ul>
      <h2 className="font-semibold text-2xl mb-5 line-clamp-1 overflow-hidden">{title}</h2>

      <p className="text-[#97989F]">
        {formatDate(created_at)}
      </p>
    </Link>
  )
}

export default PostCard;
