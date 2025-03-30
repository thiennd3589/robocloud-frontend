import { configureStore } from "@reduxjs/toolkit";
import { publicChatApi } from "../services/public-chat";
import authReducer from "./redux-auth";
import { conversationApi } from "../services/conversation";
import { privateChatApi } from "../services/private-chat";
import { userApi } from "../services/user";

export const store = configureStore({
  reducer: {
    [publicChatApi.reducerPath]: publicChatApi.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
    [privateChatApi.reducerPath]: privateChatApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      publicChatApi.middleware,
      conversationApi.middleware,
      privateChatApi.middleware,
      userApi.middleware
    );
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
