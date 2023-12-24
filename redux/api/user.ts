import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['User'],
    endpoints: (builder: {
        query: any; mutation: (arg0: { query: (body: any) => { url: string; method: string; body: any; }; }) => any; 
}) => ({

        updateProfile: builder.mutation({
            query: (body) => ({
                url: "/me/update",
                method: "PUT",
                body
            }),
        }),

        updateSession: builder.query({
            query : () => ({
                url: "/auth/session?update",
            }),
        }),

    }),
})

export const { 
    useUpdateProfileMutation, useLazyUpdateSessionQuery 
} = userApi