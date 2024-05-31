import express from "express";
import { FavMovieModel } from "../model/FavMovieModel.js";

const router = express.Router();

router.post("/save-favorite", async (req, res) => {
  try {
    const { userId, movieId, title, poster, year } = req.body;
    const existingMovie = await FavMovieModel.findOne({ userId, movieId });
    if (existingMovie) {
      return res.status(400).json({ message: "Movie already saved" });
    }

    // Save the movie as favorite
    const savedMovie = new FavMovieModel({ userId, movieId, title, poster, year });
    await savedMovie.save();

    res.status(201).json({ message: "Movie saved to favorites" });
  } catch (error) {
    console.error("Error saving favorite movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch favorite movies for the user
    const favorites = await FavMovieModel.find({ userId });
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete('/favorites/:userId/:movieId', async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    const favoriteMovie = await FavMovieModel.findOne({ userId, movieId });
    if (!favoriteMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await FavMovieModel.deleteOne({ _id: favoriteMovie._id });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie", error);
    res.status(500).json({ message: "Error while deleting" });
  }
});

export { router as MovieRouter };
