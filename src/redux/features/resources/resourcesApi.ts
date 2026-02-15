import { baseApi } from "../../createdApi/baseApi";

const resources = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllResources: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/resources",
          method: "GET",
        };
      },
      providesTags:["resources"]
    }),
  }),
});

export const { useGetAllResourcesQuery} = resources;