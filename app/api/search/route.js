import { NextResponse } from 'next/server';
import { request, gql } from 'graphql-request';

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const searchQuery = gql`
  query Search($term: String!) {
    posts(where: { title_contains: $term }) {
      title
      slug
      source: __typename
    }
    terms(where: { title_contains: $term }) {
      title
      slug
      source: __typename
    }
    genres(where: { title_contains: $term }) {
      title
      slug
      source: __typename
    }
    platforms(where: { title_contains: $term }) {
      title
      slug
      source: __typename
    }
    companies(where: { title_contains: $term }) {
      title
      slug
      source: __typename
    }
  }
`;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get('term');

  if (!term) {
    return NextResponse.json({ error: 'Search term is required' }, { status: 400 });
  }

  try {
    const data = await request(graphqlApi, searchQuery, { term });
    const results = [
      ...data.posts,
      ...data.terms,
      ...data.genres,
      ...data.platforms,
      ...data.companies,
    ];
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
