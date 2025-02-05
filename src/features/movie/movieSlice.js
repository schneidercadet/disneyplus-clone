import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
  watchlist: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommend = action.payload.recommend;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
    },
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      const exists = state.watchlist.find(item => item.id === movie.id);
      if (!exists) {
        state.watchlist = [...state.watchlist, movie];
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        movie => movie.id !== action.payload.id
      );
    },
  },
});

export const { setMovies, addToWatchlist, removeFromWatchlist } = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;
export const selectWatchlist = (state) => state.movie.watchlist || [];

export default movieSlice.reducer;
