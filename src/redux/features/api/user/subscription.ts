// import { baseApi } from "../baseApi";

import { baseApi } from "../baseApi";

// export const subscriptionApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Fetch subscription plans
//     getPlans: builder.query<{ plans: any[] }, void>({
//       query: () => ({
//         url: "/subscription-plans",
//         method: "GET",
//       }),
//       providesTags: ["Dashboard"],
//     }),

//     // Create Stripe checkout
//     createCheckout: builder.mutation<{ url: string }, { plan_id: string }>({
//       query: (body) => ({
//         url: "/subscription-checkout",
//         method: "POST",
//         body,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//   }),
//   overrideExisting: false,
// });

// export const { useGetPlansQuery, useCreateCheckoutMutation } = subscriptionApi;


// subscriptionApi.ts



// Plan type
export interface Plan {
  id: string | number;
  name: string;
  price: number;
  billing_cycle: string;
  description: string;
  features: string[];
}

// API response type
interface PlansResponse {
  success: boolean;
  data: Plan[];
}

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query<PlansResponse, void>({
      query: () => ({
        url: "/subscription-plans",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    createCheckout: builder.mutation<{ url: string }, { plan_id: string }>({
      query: (body) => ({
        url: "/subscription-checkout",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetPlansQuery, useCreateCheckoutMutation } = subscriptionApi;
