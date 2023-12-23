import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Auth'],
    endpoints: (builder: { mutation: (arg0: { query: (body: any) => { url: string; method: string; body: any; }; }) => any; }) => ({

        register: builder.mutation({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body
            }),
        }),

    }),
})

export const { useRegisterMutation  } = authApi