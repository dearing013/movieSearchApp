   import { createSlice } from '@reduxjs/toolkit';

    const authSlice = createSlice({
      name: 'auth',
      initialState: {
        isLoggedIn: false,
        user: null, // Store user details if needed
      },
      reducers: {
        login: (state,action) => {
          state.isLoggedIn = true;
          state.user = action.payload?.user || null;
        //   state.user = action.payload.user; // Assuming user data is passed
        },
        logout: (state) => {
          state.isLoggedIn = false;
          state.user = null;
        },
      },
    });

    export const { login, logout } = authSlice.actions;
    export default authSlice.reducer;