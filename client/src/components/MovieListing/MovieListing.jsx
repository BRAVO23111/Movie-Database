import React, { useState, useEffect } from "react";
import "./MovieListing.css";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchMyMovies, addMovies } from "../../slices/MovieSlice";

const MovieListing = () => {
  const [movieText, setMovieText] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);

  useEffect(() => {
    dispatch(fetchMyMovies());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!movieText){
      alert("please enter a valid text")
    }
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=a14815ea&s=${movieText}`
      );
      dispatch(addMovies(response.data.Search));

      setMovieText('')
    } catch (error) {
      console.error("Error in API call", error);
    }
  };

  return (
    <div className="Listcontainer movie-listing">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search Your Movie"
          value={movieText}
          onChange={(e) => setMovieText(e.target.value)}
          aria-label="Search Your Movie"
        />
        <button type="submit" className="submit-btn">Search</button>
      </form>
      <div className="movie-list">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-item">
              <img src={movie.Poster} alt={movie.Title} />
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </Link>
          ))
        ) : (
          <p>Please enter a character to search</p>
        )}
      </div>
    </div>
  );
};

export default MovieListing;
