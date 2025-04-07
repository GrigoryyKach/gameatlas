import { getPostDetails } from '../../../services';

export async function generateMetadata({ params }) {
  const post = await getPostDetails(params.slug);

  if (!post) {
    return {
      title: "Пост не знайдено — GameAtlas",
      description: "Ця сторінка не знайдена.",
    };
  }

  return {
    title: `${post.title} — GameAtlas`,
    description: `Детальний огляд гри ${post.title} на GameAtlas.`,
    openGraph: {
      title: `${post.title} — GameAtlas`,
      description: `Читайте про ${post.title}, розробника ${post.developers}, видавця ${post.publisher} та платформи: ${post.platforms.join(", ")}`,
      url: `https://gameatlas.vercel.app/posts/${params.slug}`,
      siteName: "GameAtlas",
      images: [
        {
          url: post.image?.url || "https://gameatlas.vercel.app/assets/Logo-final.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      locale: "uk_UA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — GameAtlas`,
      description: `Читайте про ${post.title} на GameAtlas.`,
      images: [post.image?.url || "https://gameatlas.vercel.app/assets/Logo-final.jpg"],
    },
  };
}
