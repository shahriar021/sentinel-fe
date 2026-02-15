import { baseApi } from "../../createdApi/baseApi";

const bookings = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postBooking: builder.mutation({
      query: ({token,body}) => {
        return {
          url: "/api/bookings",
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
        };
      },
      invalidatesTags:["resources"]
    }),
  }),
});

export const { usePostBookingMutation} = bookings;