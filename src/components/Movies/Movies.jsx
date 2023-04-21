import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchMoviesByKeyword } from 'services/Api/Api';
import styles from './Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get('query');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = e => {
    setSearchValue(e.target.value);
  };

  const handleSearchFormSubmit = async e => {
    e.preventDefault();
    setSearchParams({ query: searchValue });
  };

  useEffect(() => {
    if (!searchString) return;
    setLoading(true);
    try {
      const getMovies = async () => {
        const response = await searchMoviesByKeyword(searchString);
        setMovies(response);
        setLoading(false);
      };
      getMovies();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [searchString]);

  useEffect(() => {
    if (searchString) {
      console.log(searchParams);
      setLoading(true);
      try {
        const getMovies = async () => {
          const response = await searchMoviesByKeyword(searchString);
          setMovies(response);
          setLoading(false);
        };
        getMovies();
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  }, []);

  return (
    <div>
      <form className={styles['search-form']} onSubmit={handleSearchFormSubmit}>
        <input
          className={styles.input}
          type="text"
          value={searchValue}
          onChange={handleSearchInputChange}
          placeholder="Search movies"
        />
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : movies.length ? (
        <ul className={styles.list}>
          {movies.map(movie => (
            <li className={styles.items} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};
export default Movies;
