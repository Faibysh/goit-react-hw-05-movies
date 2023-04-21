import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/Api/Api';
import styles from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    try {
      const getCast = async () => {
        const response = await getMovieCast(movieId);
        setCast(response);
      };

      getCast();
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [movieId]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : cast.length ? (
        <div>
          <h2 className={styles.title}>Cast</h2>
          <ul className={styles.list}>
            {cast.map(actor => (
              <li className={styles.item} key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
                <h4>{actor.name}</h4>
                <p>{actor.character}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
};

export default Cast;
