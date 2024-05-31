import React from 'react';
import './Home.css';
import MovieListing from '../MovieListing/MovieListing';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Movie Database</h1>
      <p>Explore movies and find details about your favorites!</p>
      <MovieListing />
    </div>
  );
};

export default Home;
