import { request, gql } from 'graphql-request';

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query GetPosts($first: Int!, $skip: Int!) {
      posts(orderBy: created_at_DESC, first: $first, skip: $skip) {
        author {
          name
        }
        created_at
        genres
        image {
          url
        }
        title
        slug
      }
    }
  `

  let allPosts = [];
  let hasMore = true;
  let skip = 0;
  const first = 100;

  while (hasMore) {
    const res = await request(graphqlApi, query, { first, skip });
    const postsBatch = res.posts;

    allPosts = [...allPosts, ...postsBatch];
    skip += first;

    if (postsBatch.length < first) {
      hasMore = false;
    }
  }

  return allPosts;

  // const res = await request(graphqlApi, query);

  // return res.posts;
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          name
        }
        created_at
        slug
        title
        genres
        platforms
        publisher
        developers
        release_date
        image {
          url
        }
        content {
          raw
        }
      }
    }
  `

  const res = await request(graphqlApi, query, { slug });

  return res.post;
}

export const getLastPost = async () => {
  const query = gql`
    query GetLastPost {
      posts(last: 1) {
        created_at
        genres
        image {
          url
        }
        title
        slug
      }
    }
  `

  const res = await request(graphqlApi, query);

  return res.posts;
}

export const getNews = async () => {
  const query = gql`
    query GetNews($first: Int!, $skip: Int!) {
      news(orderBy: created_at_DESC, first: $first, skip: $skip) {
        created_at
        slug
        title
        image {
          url
        }
      }
    }
  `;

  let allNews = [];
  let hasMore = true;
  let skip = 0;
  const first = 100;

  while (hasMore) {
    const res = await request(graphqlApi, query, { first, skip });
    const newsBatch = res.news;

    allNews = [...allNews, ...newsBatch];
    skip += first;

    if (newsBatch.length < first) {
      hasMore = false;
    }
  }

  return allNews;
}

export const getNewsDetails = async (slug) => {
  const query = gql`
    query GetNewsDetails($slug: String!) {
      new(where: { slug: $slug }) {
        author {
          name
        }
        created_at
        slug
        title
        image {
          url
        }
        additional_images {
          url
        }
        video_url
        content {
          raw
        }
      }
    }
  `

  const res = await request(graphqlApi, query, { slug });

  return res.new;
}

export const getLastNews = async () => {
  const query = gql`
    query GetLastNews {
      news(orderBy: createdAt_DESC) {
        created_at
        image {
          url
        }
        title
        slug
      }
    }
  `

  const res = await request(graphqlApi, query);

  return res.news;
}

export const getGenres = async () => {
  const query = gql`
    query getGenres($first: Int!, $skip: Int!) {
      genres(first: $first, skip: $skip)  {
        slug
        title
        source
      }
    }
  `

  let allGenres = [];
  let hasMore = true;
  let skip = 0;
  const first = 100;

  while (hasMore) {
    const res = await request(graphqlApi, query, { first, skip });
    const genresBatch = res.genres;

    allGenres = [...allGenres, ...genresBatch];
    skip += first;

    if (genresBatch.length < first) {
      hasMore = false;
    }
  }

  return allGenres;
}

export const getGenreDetails = async (slug) => {
  const query = gql`
    query GetGenreDetails($slug: String!) {
      genre(where: { slug: $slug }) {
        author {
          name
        }
        slug
        title
        content {
          raw
        }
      }
    }
  `

  const res = await request(graphqlApi, query, { slug });

  return res.genre;
}

export const getPlatforms = async () => {
  const query = gql`
    query getPlatforms($first: Int!, $skip: Int!) {
      platforms(first: $first, skip: $skip)  {
        slug
        title
        source
      }
    }
  `

  let allPlatforms = [];
  let hasMore = true;
  let skip = 0;
  const first = 100;

  while (hasMore) {
    const res = await request(graphqlApi, query, { first, skip });
    const platformsBatch = res.platforms;

    allPlatforms = [...allPlatforms, ...platformsBatch];
    skip += first;

    if (platformsBatch.length < first) {
      hasMore = false;
    }
  }

  return allPlatforms;
}

export const getPlatformDetails = async (slug) => {
  const query = gql`
    query GetPlatformDetails($slug: String!) {
      platform(where: { slug: $slug }) {
        author {
          name
        }
        slug
        title
        content {
          raw
        }
      }
    }
  `

  const res = await request(graphqlApi, query, { slug });

  return res.platform;
}

export const getTerms = async () => {
  const query = gql`
    query getTerms($first: Int!, $skip: Int!) {
      terms(first: $first, skip: $skip) {
        slug
        title
        source
      }
    }
  `

  let allTerms = [];
  let hasMore = true;
  let skip = 0;
  const first = 100;

  while (hasMore) {
    const res = await request(graphqlApi, query, { first, skip });
    const termsBatch = res.terms;

    allTerms = [...allTerms, ...termsBatch];
    skip += first;

    if (termsBatch.length < first) {
      hasMore = false;
    }
  }

  return allTerms;
}

export const getTermDetails = async (slug) => {
  const query = gql`
    query GetTermDetails($slug: String!) {
      term(where: { slug: $slug }) {
        author {
          name
        }
        slug
        title
        content {
          raw
        }
      }
    }
  `

  const res = await request(graphqlApi, query, { slug });

  return res.term;
}

export const getCompanies = async (slug) => {
  const query = gql`
    query GetCompanies {
      companies {
        slug
        title
        source
      }
    }
  `

  const res = await request(graphqlApi, query, { slug });

  return res.companies;
}

export const getCompanyDetails = async (slug) => {
  const query = gql`
    query GetCompanyDetails($slug: String!) {
      company(where: { slug: $slug }) {
        author {
          name
        }
        slug
        title
        open_date
        content {
          raw
        }
      }
    }
  `

  const res = await request(graphqlApi, query, { slug });

  return res.company;
}