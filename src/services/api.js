import axios from 'axios';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '22d68eba575f04ecce30428ee4c456a2';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: KEY,
  language: 'en-US',
  include_adult: true,
};

export const getTrendings = async () => {
  const response = await axios.get('/trending/all/day');
  return response.data.results;
};

export const getMovieDetails = async id => {
  const response = await axios.get(`/movie/${id}`);
  console.log(response);
  return response.data;
};

export const getCast = async id => {
  const response = await axios.get(`/movie/${id}/credits`);
  return response.data;
};

export const getReviews = async id => {
  const response = await axios.get(`/movie/${id}/reviews`);
  return response.data;
};

export const getMovie = async searchQuery => {
  const config = {
    params: {
      query: searchQuery,
      page: 1,
    },
  };
  const response = await axios.get(`/search/movie`, config);
  return response.data.results;
};
