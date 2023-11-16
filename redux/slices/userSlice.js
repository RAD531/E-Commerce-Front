import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: [],
    // Other user-related state...
  },
  reducers: {
    setAuthenticationStatus(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // Other user-related reducers...
  },
});

export const { setAuthenticationStatus, setUser } = userSlice.actions;
export default userSlice.reducer;