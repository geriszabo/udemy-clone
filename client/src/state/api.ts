import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { User } from "@clerk/nextjs/server";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Clerk } from "@clerk/clerk-js";
import { toast } from "sonner";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  });

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorData = result.error.data;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

    if (isMutationRequest) {
      const successMessage = result.data?.message;
      if (successMessage) toast.success(successMessage);
    }

    if (result.data) {
      result.data = result.data.data;
    } else if (result.error?.status === 204 || result.meta?.response?.status) {
      return { data: null };
    }
    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { error: { status: "FETCH_RROR", error: errorMessage } };
  }
};

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses", "Users"],
  endpoints: (build) => ({
    //USER🙋🏻‍♂️
    updateUser: build.mutation<User, Partial<User> & { userId: string }>({
      query: ({ userId, ...updatedUser }) => ({
        url: `users/clerk/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),

    //COURSE📚
    getCourses: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        url: "courses",
        params: { category },
      }),
      providesTags: ["Courses"],
    }),
    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),

    updateCourse: build.mutation<
      Course,
      { courseId: string; formData: FormData }
    >({
      query: ({ courseId, formData }) => ({
        url: `courses/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Courses", id: courseId },
      ],
    }),

    createCourse: build.mutation<
      Course,
      { teacherId: string; teacherName: string }
    >({
      query: (body) => ({
        url: "courses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Courses"],
    }),
    deleteCourse: build.mutation<{ message: string }, Course["courseId"]>({
      query: (courseId) => ({
        url: `courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),

    //TRANSACTION💸
    getTransactions: build.query<Transaction[], string>({
      query: (userId) => `transactions?userId=${userId}`,
    }),
    createStripePaymentIntent: build.mutation<
      { clientSecret: string },
      { amount: number }
    >({
      query: ({ amount }) => ({
        url: `/transactions/stripe/payment-intent`,
        method: "POST",
        body: { amount },
      }),
      invalidatesTags: ["Users"],
    }),
    createTransaction: build.mutation<Transaction, Partial<Transaction>>({
      query: (transaction) => ({
        url: "transactions",
        method: "POST",
        body: transaction,
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUpdateCourseMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateStripePaymentIntentMutation,
  useCreateTransactionMutation,
  useGetTransactionsQuery,
} = api;
