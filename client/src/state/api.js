import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create an instance of the Redux Toolkit API using the provided configuration object
export const api = createApi({
  // Configure the base query with the API base URL from the environment variables
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),

  // Set the name of the Redux Toolkit slice used to store the API state
  reducerPath: "adminApi",

  // Define the available tag types used for query caching
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
  ],

  // Define the available endpoints for the API
  endpoints: (build) => ({
    // Define the "getUser" endpoint with a query function that returns the URL for a given user ID
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: `client/transactions`,
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => `client/geography`,
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => `sales/sales`,
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => `management/admins`,
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
  }),
});

// Export a hook for the "getUser" endpoint
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useUserPerformanceQuery,
} = api;

/*
The above code creates an instance of the Redux Toolkit API using createApi() function provided by Redux Toolkit. It sets the base URL for the API requests using the fetchBaseQuery() function from the @reduxjs/toolkit/query/react package. It also sets the name of the Redux Toolkit slice where the API state will be stored and the available tag types used for query caching.

In the endpoints section, it defines an endpoint for the API called getUser with a query function that returns the URL for a given user ID. It also sets the providesTags option to ["User"], indicating that the User tag should be added to the cache when this endpoint is queried.

At the end of the module, it exports a hook called useGetUserQuerys for the getUser endpoint. This hook can then be used in a React component to fetch data from the API using the useQuery hook provided by Redux Toolkit Query. The useGetUserQuerys hook is automatically generated by the createApi() function and provides easy access to the getUser endpoint's query function and other query-related functions.
*/
