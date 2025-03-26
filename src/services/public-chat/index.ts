// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Chat } from "../../types/chat";

// Define a service using a base URL and expected endpoints
export const publicChatApi = createApi({
  reducerPath: "publicChat",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/chat`,
  }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getPublicChat: builder.query<Array<Chat>, undefined>({
      query: () => ({ url: "/public" }),
      transformResponse: (res: { data: Array<Chat> }) => res.data,
    }),
    addChat: builder.mutation<Array<Chat>, { input: string }>({
      query: (body) => ({
        url: "/public",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPublicChatQuery, useAddChatMutation } = publicChatApi;
