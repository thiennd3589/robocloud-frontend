// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Chat } from "../../types/chat";
import Cookies from "js-cookie";
import { RequestMethod } from "../../types/request";
// Define a service using a base URL and expected endpoints
export const privateChatApi = createApi({
  reducerPath: "privateChat",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/chat`,
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("accessToken");

      headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    },
  }),
  tagTypes: ["PrivateChat"],
  endpoints: (builder) => ({
    getPrivateChat: builder.query<Array<Chat>, string>({
      query: (conversationId) => ({ url: `/${conversationId}` }),
    }),
    addPrivateChat: builder.mutation<
      Array<Chat>,
      { input: string; conversationId: string }
    >({
      query: (body) => {
        return {
          url: `/`,
          method: RequestMethod.POST,
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPrivateChatQuery,
  useAddPrivateChatMutation,
  useLazyGetPrivateChatQuery,
} = privateChatApi;
