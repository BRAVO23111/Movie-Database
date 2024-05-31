import React from 'react';
import './Aboutus.css'; // Import CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>Welcome to Movie Database!</p>
      <p>Movie Database is your one-stop destination for all things movies.</p>
      <p>With Movie Database, you can:</p>
      <ul>
        <li>Search for any movie and get detailed information about it.</li>
        <li>Save your favorite movies for later viewing.</li>
        <li>Discover new movies and explore various genres.</li>
        {/* Add more features as needed */}
      </ul>
      <p>Whether you're a movie buff or just looking for something to watch, Movie Database has you covered.</p>
    </div>
  );
};

export default AboutUs;
