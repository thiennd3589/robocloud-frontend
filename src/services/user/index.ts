// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Chat } from "../../types/chat";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/user`,
  }),
  endpoints: (builder) => ({
    getCurrentUserInfo: builder.query<Array<Chat>, undefined>({
      query: () => ({ url: "/me" }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetCurrentUserInfoQuery } = userApi;
