import React, { useState, useEffect } from 'react';
import { getMovieReviews } from 'services/Api/Api';
import { useParams } from 'react-router-dom';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const getReviews = async () => {
        const response = await getMovieReviews(movieId);
        setReviews(response);
      };

      getReviews();
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2 className={styles.title}>Reviews</h2>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map(review => (
                <li className={styles.id} key={review.id}>
                  <h4 className={styles.author}>{review.author}</h4>
                  <p className={styles.content}>{review.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.title}>No reviews found</p>
          )}
        </div>
      )}
    </>
  );
};

export default Reviews;
