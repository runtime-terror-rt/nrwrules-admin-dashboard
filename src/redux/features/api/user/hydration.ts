import { baseApi } from "../baseApi";

const hydrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHydrationLogs: builder.query({
      query: () => ({
        url: "/hydration-logs",
        method: "GET",
      }),
      providesTags: ["Hydration"],
    }),

    createHydrationLog: builder.mutation({
      query: (body) => ({
        url: "/hydration-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Hydration"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHydrationLogsQuery,
  useCreateHydrationLogMutation,
} = hydrationApi;

export default hydrationApi;