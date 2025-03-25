import { configureStore } from "@reduxjs/toolkit";
import { publicChatApi } from "../services/public-chat";

export const store = configureStore({
  reducer: {
    [publicChatApi.reducerPath]: publicChatApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(publicChatApi.middleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
