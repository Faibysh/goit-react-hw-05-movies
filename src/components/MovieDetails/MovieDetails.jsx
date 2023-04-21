import React, { useState, useEffect } from 'react';
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import { getMovieDetails } from 'services/Api/Api';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getMovies = async () => {
        const response = await getMovieDetails(movieId);
        setMovieDetails(response);
        setLoading(false);
      };
      getMovies();
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, [movieId]);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/';
  const posterSize = 'w300';
  const posterUrl = `${imageBaseUrl}${posterSize}${movieDetails.poster_path}`;

  return (
    <>
      <div className={styles.info}>
        <div className={styles.main}>
          {loading ? (
            <div>Loading...</div>
          ) : Object.keys(movieDetails).length ? (
            <>
              <h2 className={styles.title}>{movieDetails.title}</h2>
              <img
                className={styles.img}
                src={posterUrl}
                alt={movieDetails.title}
              />
            </>
          ) : (
            <div>{error}</div>
          )}
        </div>
        <div className={styles.details}>
          <p className={styles.details}>{movieDetails.overview}</p>
          <p className={styles.details}>
            Release date: {movieDetails.release_date}
          </p>
          <p className={styles.details}>Rating: {movieDetails.vote_average}</p>
        </div>
      </div>

      <div className={styles.links}>
        <Link className={styles.link} to="cast">
          Cast
        </Link>
        <Link className={styles.link} to="reviews">
          Reviews
        </Link>
      </div>
      <button className={styles.button} onClick={() => navigate(-1)}>
        Go Back
      </button>
      <Outlet />
    </>
  );
};

export default MovieDetails;
