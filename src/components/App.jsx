import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';
import {
  getMovieCast,
  getMovieDetails,
  getMovieReviews,
  getPopularMovies,
  searchMoviesByKeyword,
} from 'services/Api/Api';
import styles from './App.module.css';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleSearch = async keyword => {
    const searchMoviesData = await searchMoviesByKeyword(keyword);
    setSearchMovies(searchMoviesData.results);
  };

  const handleGetMovieDetails = async movieId => {
    const movieDetailsData = await getMovieDetails(movieId);
    setMovieDetails(movieDetailsData);
  };

  const handleGetMovieCast = async movieId => {
    const castData = await getMovieCast(movieId);
    setCast(castData.cast);
  };

  const handleGetMovieReviews = async movieId => {
    const reviewsData = await getMovieReviews(movieId);
    setReviews(reviewsData.results);
  };

  return (
    <BrowserRouter>
      <nav>
        <ul className={styles.buttons}>
          <li>
            <Link className={styles.button} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.button} to="/movies">
              Movies
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="/movies/:movieId/cast" element={<Cast />} />
          <Route path="/movies/:movieId/reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
