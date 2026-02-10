/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

// TypeScript interfaces
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string | null;
  is_active?: boolean | number | string;
}

export interface DoctorResponse {
  success: boolean;
  message: string;
  data: Doctor[];
}

export interface CreateDoctorResponse {
  success: boolean;
  message: string;
  data: Doctor;
}

const doctorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<DoctorResponse, void>({
      query: () => "/doctors",
      providesTags: ["Doctor"],
    }),

    createDoctor: builder.mutation<CreateDoctorResponse, FormData>({
      query: (formData) => ({
        url: "/doctors",
        method: "POST",
        body: formData,
        // IMPORTANT: Do NOT set Content-Type here — let fetchBaseQuery handle multipart/form-data automatically
      }),
      invalidatesTags: ["Doctor"],
    }),

    updateDoctor: builder.mutation<CreateDoctorResponse, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/doctor_update/${id}`,
        method: "POST",
        body: formData,
        // Same here — no Content-Type
      }),
      invalidatesTags: ["Doctor"],
    }),

    deleteDoctor: builder.mutation<CreateDoctorResponse, number>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),

    toggleDoctorStatus: builder.mutation<CreateDoctorResponse, number>({
      query: (id) => ({
        url: `/doctors/toggle-status/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
  useToggleDoctorStatusMutation,
} = doctorsApi;

export default doctorsApi;