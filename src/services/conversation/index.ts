// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Conversation } from "../../types/conversation";
import { RootState } from "../../redux/store";
import { RequestMethod } from "../../types/request";

// Define a service using a base URL and expected endpoints
export const conversationApi = createApi({
  reducerPath: "conversation",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/conversation`,
    prepareHeaders(headers, { getState }) {
      const { accessToken } = (getState() as RootState).auth;
      if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    },
  }),
  tagTypes: ["Conversation"],
  endpoints: (builder) => ({
    getConversation: builder.query<Array<Conversation>, undefined>({
      query: () => ({ url: "/" }),
      providesTags: [{ type: "Conversation", id: "LIST" }],
    }),
    createConversation: builder.mutation<Conversation, { title: string }>({
      query: (body) => ({ url: "/", method: RequestMethod.POST, body }),
      invalidatesTags: [{ type: "Conversation", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetConversationQuery, useCreateConversationMutation } =
  conversationApi;
