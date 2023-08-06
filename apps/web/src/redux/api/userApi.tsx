import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../../config/config";
import { auth } from "../../config/firebase.config";
import { logout } from "../slices/authSlice";
import { signOut } from "firebase/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: API,
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem("gamifyToken");
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});
const baseQueryWithReAuth = async (arg: any, api: any, extraOpts: any) => {
  try {
    const result = await baseQuery(arg, api, extraOpts);
    const errorData: any = result.error?.data;
    // const user = api.getState().auth.user;
    if (
      errorData?.statusCode == 401 &&
      errorData.message === "token has expired"
    ) {
      await signOut(auth);
      api.dispatch(logout());
    }
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: ({ mutation, query }) => ({
    getUserGames: query({
      query: () => "/user/games",
      transformResponse: (res: any) => res.data,
    }),
    getDefaultGameList: query({
      query: () => "/game",
      transformResponse: (res: any) => res.data,
    }),
    getUserDefaultGameList: query({
      query: () => "/user/default-games",
      transformResponse: (res: any) => res.data,
    }),
    getGame: query({
      query: (id: string) => `/game/${id}`,
      transformResponse: (res: any) => res.data,
    }),
    getUsersActivity: query({
      query: () => "/user/activity",
      transformResponse: (res: any) => res.data,
    }),
    postUserPlays: mutation({
      query: (game) => ({
        method: "POST",
        url: `/user/game/${game.id}?action=plays`,
        body: game,
      }),
    }),
    postUserShares: mutation({
      query: (game) => ({
        method: "POST",
        url: `/user/game/${game.id}?action=shares`,
        body: game,
      }),
    }),
    postUserLikes: mutation({
      query: (game) => ({
        method: "POST",
        url: `/user/game/${game.id}?action=likes`,
        body: game,
      }),
    }),
    postUserDislikes: mutation({
      query: (id) => ({
        method: "DELETE",
        url: `user/game/dislike/${id}`,
      }),
    }),
  }),
});

export const {
  useGetUserGamesQuery,
  useGetDefaultGameListQuery,
  useGetGameQuery,
  useGetUserDefaultGameListQuery,
  useGetUsersActivityQuery,
  usePostUserPlaysMutation,
  usePostUserSharesMutation,
  usePostUserLikesMutation,
  usePostUserDislikesMutation,
} = userApi;
