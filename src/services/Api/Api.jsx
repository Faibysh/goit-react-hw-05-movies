import axios from 'axios';

const API_KEY = 'b56c78249136469d00b4e15579d84d9d';
const BASE_URL = 'https://api.themoviedb.org/3/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`trending/movie/day`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch popular movies');
  }
};

export const searchMoviesByKeyword = async keyword => {
  try {
    const response = await axios.get(`search/movie`, {
      params: {
        query: keyword,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to search for movies');
  }
};

export const getMovieDetails = async movieId => {
  try {
    const response = await axios.get(`movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch details for movie with id ${movieId}`);
  }
};

export const getMovieCast = async movieId => {
  try {
    const response = await axios.get(`movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch cast for movie with id ${movieId}`);
  }
};

export const getMovieReviews = async movieId => {
  try {
    const response = await axios.get(`movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch reviews for movie with id ${movieId}`);
  }
};
