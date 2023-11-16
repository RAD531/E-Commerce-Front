import baseApi from '../apiSlice'
import { setAuthenticationStatus, setUser } from '../../slices/userSlice';

export const userApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (formData) => ({
                url: '/user/register',
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: ['User'],
        }),
        loginUser: builder.mutation({
            query: ({ email, password }) => ({
                url: '/user/login',
                method: 'POST',
                body: { email, password },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['User']
        }),
        logOutUser: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'GET',
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                queryFulfilled.then(result => {
                    dispatch(setAuthenticationStatus(false));
                })
            },
            invalidatesTags: ['User']
        }),
        getUser: builder.query({
            query: () => '/user/profile',
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                queryFulfilled.then(result => {
                    dispatch(setUser(result.data.user));
                }).catch(() => {

                })
            },
            providesTags: ['User']
        }),
        changeUserPassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: '/user/changepassword',
                method: 'PUT',
                body: { oldPassword, newPassword },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogOutUserMutation, useGetUserQuery, useChangeUserPasswordMutation } = userApiSlice;