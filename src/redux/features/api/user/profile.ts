import { baseApi } from "../baseApi";

interface IUserResponse {
  success: boolean;
  data: IUserData;
}

interface IUserData {
  user: IUser;
  address?: string;
  language?: string;
  pregnancy_status?: string;
  due_date?: string;
  current_week?: number;
  baby_nickname?: string;
  doctor_name?: string;
  hospital_name?: string;
  AI_tone?: string;
  support_type?: string;
  product_interest?: string;
  dietary_preferences?: string;
  postpartum_day?: number;
  isKickRemind?: boolean;
  isHydrationGoal?: boolean;
  isWeightTrack?: boolean;
  two_factor_auth?: boolean;
  delivery_type?: "vaginal_delivery" | "cesarean_delivery";
}

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

export interface IUpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  language?: string;
  pregnancy_status?: string;
  due_date?: string;
  current_week?: number;
  baby_nickname?: string;
  doctor_name?: string;
  hospital_name?: string;
  AI_tone?: string;
  support_type?: string;
  product_interest?: string;
  dietary_preferences?: string;
  postpartum_day?: number;
  isKickRemind?: boolean;
  isHydrationGoal?: boolean;
  isWeightTrack?: boolean;
  two_factor_auth?: boolean;
  delivery_type?: "vaginal_delivery" | "cesarean_delivery";
}

interface IUserDashboardResponse {
  success: boolean;
  data: {
    first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
    totalExaminees: number;
    totalCompletedQuizzes: number;
    upcomingAppointments?: string[];
    recentActivities?: string[];
  };
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<IUserResponse, void>({
      query: () => ({
        url: "/my-profile", // Keep this GET
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    postMyProfile: builder.mutation<IUserResponse, IUpdateProfilePayload>({
      query: (payload) => ({
        // CHANGE THIS URL BELOW
        url: "/profiles", // Check if your endpoint is actually "/profiles" or "/update-profile"
        method: "POST", 
        body: payload,
      }),
      invalidatesTags: ["Profile"],
    }),

    getUserDashboard: builder.query<IUserDashboardResponse, void>({
      query: () => ({
        url: "/user-dashboard",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
  overrideExisting: true, // Set to true to avoid the HMR warnings in your logs
});
export const { useGetMyProfileQuery, usePostMyProfileMutation,useGetUserDashboardQuery  } = profileApi;
export default profileApi;