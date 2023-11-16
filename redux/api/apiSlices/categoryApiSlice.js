import baseApi from '../apiSlice';

export const categoryApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: '/product/categories',
            }),
            providesTags: ['Category']
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: '/product/category',
                method: 'POST',
                body: { category },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Category']
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/product/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        }),
    }),
});

export const { useGetAllCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation } = categoryApiSlice;