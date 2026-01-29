import { baseApi } from "../baseApi";

const community = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunityPosts: builder.query({
      query: () => ({
        url: "/community/posts/1",
        method: "GET",
      }),
      providesTags: ["Community"],
    }),
    getCommunityGroups: builder.query({
      query: () => ({
        url: "/community-groups",
        method: "GET",
      }),
      providesTags: ["Community"],
    }),
    joinCommunityGroup: builder.mutation({
      query: (id: number) => ({
        url: `/groups/join`,
        method: "POST",
        body: {
          group_id: id,
        },
      }),
      invalidatesTags: ["Community"],
    }),
    likeCommunityGroupPost: builder.mutation({
      query: (id: number) => ({
        url: `/community/like`,
        method: "POST",
        body: {
          post_id: id,
        },
      }),
      invalidatesTags: ["Community"],
    }),
    commentCommunityGroupPost: builder.mutation({
      query: (body: { post_id: number; comment: string }) => ({
        url: `/community/comment`,
        method: "POST",
        body: {
          post_id: body.post_id,
          comment: body.comment,
        },
      }),
      invalidatesTags: ["Community"],
    }),
  }),
});

export const {
  useGetCommunityPostsQuery,
  useGetCommunityGroupsQuery,
  useJoinCommunityGroupMutation,
  useLikeCommunityGroupPostMutation,
  useCommentCommunityGroupPostMutation,
} = community;

export default community;
