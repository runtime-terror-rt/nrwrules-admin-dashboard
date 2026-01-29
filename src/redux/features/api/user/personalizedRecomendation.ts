import { baseApi } from "../baseApi";

const personalizedRecomendation = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalizedRecomendationProducts: builder.query({
      query: ({
        pregnancy_week,
        dietary_preference,
        food_items,
      }: {
        pregnancy_week: number;
        dietary_preference: string;
        food_items?: string[];
      }) => ({
        url: "/pregnancy-products",
        method: "GET",
        params: {
          pregnancy_week,
          dietary_preference,
          food_items,
        },
        providesTags: ["Recommendations"],
      }),
    }),
  }),
});

export const { useGetPersonalizedRecomendationProductsQuery } =
  personalizedRecomendation;

export default personalizedRecomendation;
