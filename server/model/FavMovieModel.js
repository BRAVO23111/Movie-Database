import mongoose from "mongoose";

const FavMovie = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      movieId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      poster: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      }
})

export const FavMovieModel  = mongoose.model("FavMovie" ,FavMovie);