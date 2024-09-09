import Link from "next/link";
import Image from "next/image";

import { formatDate } from '../lib/formatDate';

const PostCard = ({ post }) => {
  const { title, image, genres, slug, created_at } = post;

  const staticGenres = genres.slice(0, 2);

  return (
    <Link
      href={`/posts/${slug}`}
      className="max-w-[394px] md:max-w-full p-4 flex flex-col items-center xl:items-start border border-[#242535] rounded-lg hover:shadow-accent/10 hover:shadow-lg hover:scale-105 transition-all"
    >
      <div className="flex justify-center">
        <Image
          src={image.url}
          className="w-[360px] max-h-[202px] object-cover rounded-md mb-4"
          alt={title}
          width={360}
          height={240}
        />
      </div>
      <div className="flex flex-col items-center xl:items-start">
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
      </div>
    </Link>
  )
}

export default PostCard;
