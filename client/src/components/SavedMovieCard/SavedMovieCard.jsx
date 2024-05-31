import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SavedMovieCard.css";

const SavedMovie = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const userId = localStorage.getItem("userId");

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`https://movie-database-x595.onrender.com/savedMovie/favorites/${userId}/${movieId}`);
      setSavedMovies(savedMovies.filter((movie) => movie.movieId !== movieId));
    } catch (error) {
      console.error("Error deleting saved movie:", error);
    }
  };

  useEffect(() => {
    const fetchSavedMovies = async () => {
      if (!userId) return; // Skip fetching if there's no userId

      try {
        const response = await axios.get(`https://movie-database-x595.onrender.com/savedMovie/favorites/${userId}`);
        setSavedMovies(response.data);
      } catch (error) {
        console.error("Error fetching saved movies:", error);
      }
    };

    fetchSavedMovies();
  }, [userId]);

  return (
    <div className="saved-movie-container">
      <h1>Your Saved Movies</h1>
      <div className="saved-movie-list">
        {!userId ? (
          <p>Please log in to mark your favorite movies!</p>
        ) : savedMovies.length > 0 ? (
          savedMovies.map((movie) => (
            <div key={movie.movieId} className="saved-movie-item">
              <Link to={`/movie/${movie.movieId}`}>
                <img src={movie.poster} alt={movie.title} />
                <div className="saved-movie-info">
                  <h2>{movie.title}</h2>
                  <p>{movie.year}</p>
                </div>
              </Link>
              <button onClick={() => handleDelete(movie.movieId)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No movies marked as favorites.</p>
        )}
      </div>
    </div>
  );
};

export default SavedMovie;
