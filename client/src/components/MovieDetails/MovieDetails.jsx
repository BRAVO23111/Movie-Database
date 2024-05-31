import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyMoviesDetail, removeMovies } from "../../slices/MovieSlice";
import { FaFilm, FaUser, FaCalendarAlt } from "react-icons/fa";
import { Audio } from "react-loader-spinner";
import axios from "axios";
const MovieDetails = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavorite = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await axios.get(`https://movie-database-x595.onrender.com/savedMovie/favorites/${userId}`);
      const favoriteMovies = response.data;
      setIsFavorite(favoriteMovies.some((favMovie) => favMovie.movieId === imdbID));
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };
  const handleSaveFavorite = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to save favorites");
      return;
    }

    try {
      await axios.post("https://movie-database-x595.onrender.com/savedMovie/save-favorite", {
        userId,
        movieId: imdbID,
        title: selectedMovie.Title,
        poster: selectedMovie.Poster,
        year: selectedMovie.Released,
      });
      setIsFavorite(true);
      alert("Movie saved to favorites");
    } catch (error) {
      console.error("Error saving favorite movie:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchMyMoviesDetail(imdbID));
    checkFavorite()
    return () => {
      dispatch(removeMovies());
    };
  }, [dispatch, imdbID]);

  return (
    <div className="container">
      {selectedMovie.Title ? (
        <div className="movie-details">
          <div className="details">
            <h1>{selectedMovie.Title}</h1>
            <p>{selectedMovie.Plot}</p>
            <p>
              <FaUser className="icon" />
              <strong>Director:</strong> {selectedMovie.Director}
            </p>
            <p>
              <FaFilm className="icon" />
              <strong>Actors:</strong> {selectedMovie.Actors}
            </p>
            <p>
              <FaCalendarAlt className="icon" />
              <strong>Released:</strong> {selectedMovie.Released}
            </p>
            <button onClick={handleSaveFavorite} disabled={isFavorite}>
              {isFavorite ? "Marked ✅" : "Mark as Favorite"}
            </button>
          </div>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
        </div>
      ) : (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      )}
    </div>
  );
};

export default MovieDetails;
