import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "../model/library";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type MetadataSearch = {
  author: string;
  year: number;
  genre: string;
};

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}` }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "books/",
    }),
    searchBooks: builder.query<Book[], string>({
      query: (keyword) => ({
        url: "books/search",
        params: { keyword },
      }),
    }),
    searchByRegex: builder.query<Book[], string>({
      query: (regex) => ({
        url: `books/search/regex`,
        params: { regex },
      }),
    }),
    searchByPhrase: builder.query<Book[], string>({
      query: (phrase) => ({
        url: `books/search/phrase`,
        params: { phrase },
      }),
    }),
    searchByWeighting: builder.query<Book[], string>({
      query: (keyword) => ({
        url: `books/search/tfidf`,
        params: { keyword },
      }),
    }),
    searchByNLP: builder.query<Book[], string>({
      query: (query) => ({
        url: `books/search/nlp`,
        params: { query },
      }),
    }),
    searchByMetadata: builder.query<Book[], MetadataSearch>({
      query: ({ author }) => ({
        url: `books/search/metadata`,
        params: { author },
      }),
    }),

    searchByFuzzy: builder.query<Book[], string>({
      query: (keyword) => ({
        url: `books/search/fuzzy`,
        params: { keyword },
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSearchBooksQuery,
  useSearchByRegexQuery,
  useSearchByPhraseQuery,
  useSearchByWeightingQuery,
  useSearchByNLPQuery,
  useSearchByMetadataQuery,
  useSearchByFuzzyQuery,
} = bookApi;
