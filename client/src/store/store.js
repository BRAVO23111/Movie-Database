import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../slices/MovieSlice';


const Store = configureStore({
  reducer: {
    movies: movieReducer
  }
});

export default Store;
