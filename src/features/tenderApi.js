import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_API = `${import.meta.env.VITE_API_BASE_URL}`;

export const tenderApi = createApi({
  reducerPath: "tenderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllPubliceTenders: builder.query({
      query: ({ token }) => ({
        url: `tender/public`,
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getsingleTender: builder.mutation({
      query: ({ token, id }) => ({
        url: `tender/tenders/${id}`,
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSingleUserTender: builder.mutation({
      query: ({ token, id }) => ({
        url: `user_tender/user_tenders?tender_id=${id}`,
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    submitForm: builder.mutation({
      query: ({ formData, token }) => ({
        url: `user_tender/user_tenders`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          user_tender: {
            ...formData,
          },
        },
      }),
    }),

    setWinner: builder.mutation({
      query: ({ message, attachment, id, token }) => ({
        url: `user_tender/user_tenders/${id}/set_winner`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { message, attachment },
      }),
    }),
    generateRefund: builder.mutation({
      query: ({ id, token }) => ({
        url: `user_tender/user_tenders/mark_refunded?tender_id=${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getWinner: builder.mutation({
      query: ({ id, token, status = "winner" }) => ({
        url: `user_tender/user_tenders/filter_by_status?tender_id=${id}&status=${status}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    registerUser:builder.mutation({
      query: (formData) => ({
        url: `auth/signup`,
        method: "POST",
       body:formData
      }),
    }),
  }),
});

export const {
  useGetAllPubliceTendersQuery,
  useGetsingleTenderMutation,
  useSubmitFormMutation,
  useGetSingleUserTenderMutation,
  useSetWinnerMutation,
  useGenerateRefundMutation,
  useGetWinnerMutation,
  useRegisterUserMutation
} = tenderApi;
