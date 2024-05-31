import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMyMovies = createAsyncThunk(
  'movies/fetchMyMovies',
  async () => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=a14815ea&s=Harry+Potter`
    );
    return response.data.Search;
  }
);

export const fetchMyMoviesDetail = createAsyncThunk(
  'movies/fetchMyMoviesDetail',
  async (id) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=a14815ea&i=${id}&plot=full`
    );
    return response.data;
  }
);

const initialState = {
  movies: [],
  selectedMovie: {},
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
    removeMovies: (state) => {
      state.selectedMovie = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyMovies.pending, (state) => {
        console.log("pending");
      })
      .addCase(fetchMyMovies.fulfilled, (state, action) => {
        console.log("fetched successfully");
        state.movies = action.payload;
      })
      .addCase(fetchMyMovies.rejected, (state) => {
        console.log("failed");
      })
      .addCase(fetchMyMoviesDetail.fulfilled, (state, action) => {
        console.log("done");
        state.selectedMovie = action.payload;
      });
  }
});

export const { addMovies, removeMovies } = movieSlice.actions;
export default movieSlice.reducer;
