   import { createSlice } from '@reduxjs/toolkit';

    const authSlice = createSlice({
      name: 'auth',
      initialState: {
        isLoggedIn: false,
        user: null, // Store user details if needed
        favouriteMovies: []
      },
      reducers: {
        login: (state,action) => {
          state.isLoggedIn = true;
          state.user = action.payload?.user || null;
          console.log("theloggedin",state.isLoggedIn)
          // state.favouriteMovies = action.payload?.user?.favouriteMovies ?? state.favouriteMovies;
        //   state.user = action.payload.user; // Assuming user data is passed
        },
        logout: (state) => {
          state.isLoggedIn = false;
          state.user = null;
          state.favouriteMovies = [];
        },
        setFavourites: (state, action) => {
          state.favouriteMovies = Array.isArray(action.payload) ? action.payload : [];
          console.log("favourites are", state.favouriteMovies)
        },
        addFavourite: (state, action) => {
          const movie = action.payload;
          if (!movie) return;
          const id = movie.imdbID ?? movie.id ?? movie.Title ?? movie.title;
          if (!id) {
            
            // if no identifiable id, push the object to be safe
            state.favouriteMovies.push(movie);
            return;
          }
        state.favouriteMovies = state.favouriteMovies ?? [];
        const exists = state.favouriteMovies.some(m => {
        const mid = m?.imdbID ?? m?.id ?? m?.Title ?? m?.title;
        return mid && mid === id;
        });
        if (!exists) state.favouriteMovies.push(movie);
      },
      removeFavourite: (state, action) => {
        const param = action.payload;
        // prefer title if provided (string or object with Title), otherwise fall back to id fields
        const titleParam = typeof param === 'string' ? param : (param?.Title ?? param?.title);
        const idParam = typeof param === 'object' ? (param?.imdbID ?? param?.id ?? null) : null;

        const clean = (s) => (s ?? '').toString().trim().toLowerCase();

        state.favouriteMovies = (state.favouriteMovies ?? []).filter(m => {
          const mid = m?.imdbID ?? m?.id ?? m?.Title ?? m?.title ?? null;
          const mTitle = m?.Title ?? m?.title ?? '';
          if (titleParam) {
            return clean(mTitle) !== clean(titleParam);
          }
          if (idParam) {
            return mid !== idParam;
          }
          // nothing to match against: keep the item
          return true;
        });
      },
      clearFavourites: (state) => {
        state.favouriteMovies = [];
      },
    }
    });
    export const { login, logout, setFavourites, addFavourite, removeFavourite, clearFavourites } = authSlice.actions;
    export default authSlice.reducer;