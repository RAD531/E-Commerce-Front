import baseApi from '../apiSlice'

export const profileApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfilePicture: builder.mutation({
            query: (formData) => ({
                url: '/user/updatepic',
                method: 'PUT',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: ['User'],
        }),
        updateProfile: builder.mutation({
            query: (name, email, address, city, country, pinCode) => ({
                url: '/user/updateprofile',
                method: 'PUT',
                body: { name, email, address, city, country, pinCode },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useUpdateProfilePictureMutation, useUpdateProfileMutation } = profileApiSlice;