"use client";

import Link from "next/link";
import Image from "next/image";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', 'month': 'long', day: 'numeric' };
  return date.toLocaleDateString('en-EN', options);
};

const NewsPostCard = ({ post }) => {
  const { title, image, created_at, id } = post;

  return (
    <Link
      href={`/news/${id}`}
      className="max-w-[394px] md:max-w-full p-4 flex flex-col items-center xl:items-start border border-[#242535] rounded-lg hover:shadow-accent/10 hover:shadow-lg hover:scale-105 transition-all"
    >
      <Image
        src={`https://drive.google.com/uc?export=view&id=${image}`}
        className="w-[360px] min-h-[202px] max-h-[202px] object-cover rounded-md mb-4"
        alt={title}
        width={360}
        height={240}
        objectFit="cover"
      />
      <div className="flex flex-col items-center xl:items-start">
        <h2 className="font-semibold text mb-5 line-clamp-1 overflow-hidden text-ellipsis">{title}</h2>
  
        <p className="text-[#97989F]">
          {formatDate(created_at)}
        </p>
      </div>
    </Link>
  )
}

export default NewsPostCard;
