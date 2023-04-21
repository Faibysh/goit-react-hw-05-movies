import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularMovies } from 'services/Api/Api';
import styles from './Home.module.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const popularMoviesData = await getPopularMovies();
      setPopularMovies(popularMoviesData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Popular Movies Today</h1>
      <ul className={styles['movie-list']}>
        {popularMovies.map(movie => (
          <li className={styles.movie} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title ?? movie.name}</Link>
          </li>
        ))}
      </ul>
      {}
    </div>
  );
};

export default Home;
