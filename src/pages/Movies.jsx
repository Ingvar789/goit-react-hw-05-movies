// імпорт компонент
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getMovie } from 'services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';

const Movies = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const [movies, setMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pending, setPending] = useState(false);

  const handleFormSubmit = query => {
    setMovie([]);
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const getResponse = async () => {
      setPending(true);
      try {
        const response = await getMovie(searchQuery);

        if (response.length !== 0) {
          setMovie(response);
          return;
        }

        toast.warning('There are no movies for your request.');
        return;
      } catch (error) {
        toast.error(error);
      } finally {
        setPending(false);
        setUrlParams(prevParams => {
          return { ...prevParams, ...{ query: searchQuery } };
        });
      }
    };
    getResponse();
  }, [searchQuery, setUrlParams]);

  useEffect(() => {
    const getResponse = async () => {
      setPending(true);
      try {
        const response = await getMovie(urlParams.get('query'));

        if (response.length !== 0) {
          setMovie(response);
          return;
        }

        toast.warning('There are no movies for your request.');
        return;
      } catch (error) {
        toast.error(error);
      } finally {
        setPending(false);
      }
    };
    if (urlParams.get('query')) {
      getResponse();
      setSearchQuery(urlParams.get('query'));
    }
  }, [urlParams]);

  return (
    <>
      {console.log(movies)}
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleFormSubmit} query={searchQuery} />
      {movies.length !== 0 && (
        <>
          {pending ? (
            <Loader />
          ) : (
            <ul>
              {movies.map(movie => {
                return (
                  <li key={movie.id}>
                    <Link
                      to={`/movies/${movie.id}`}
                      state={{ from: `/movies?query=${searchQuery}` }}
                    >
                      {movie.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default Movies;
