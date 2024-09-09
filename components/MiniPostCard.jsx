import Link from "next/link";

const getLinkPath = (table, slug) => {
  switch (table) {
    case 'terms':
      return `/terms/${slug}`;
    case 'genres':
      return `/genres/${slug}`;
    case 'platforms':
      return `/platforms/${slug}`;
    default:
      return `/`;
  }
};

const MiniPostCard = ({ post }) => {
  return (
    <Link
      href={`${getLinkPath(post.source, post.slug)}`}
      className='block min-w-[300px] bg-minibg rounded-3xl border-b-2 border-accent/30 hover:border-accent transition-all'
    >
      {post.title}
    </Link>
  )
}

export default MiniPostCard;
