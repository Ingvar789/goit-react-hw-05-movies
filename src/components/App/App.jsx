// імпорт компонент
import React, { useState, useEffect } from 'react';
import getImages from '../../services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import css from './App.module.css';
import { toast } from 'react-toastify';
import Loader from 'components/Loader/Loader';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(false);

  const handleFormSubmit = query => {
    setPictures([]);
    setPage(1);
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const getResponse = async () => {
      setPending(true);
      try {
        const response = await getImages(searchQuery, page);

        if (response.length !== 0) {
          if (page === 1) {
            setPictures(response);
            return;
          } else {
            setPictures(prevPictures => [...prevPictures, ...response]);
          }
          return;
        }
        toast.warning('There are no pictures for your request.');
        return;
      } catch (error) {
        toast.error(error);
      } finally {
        setPending(false);
      }
    };
    getResponse();
  }, [searchQuery, page]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleFormSubmit} />
      {pictures.length !== 0 && (
        <>
          <ImageGallery pictures={pictures} />
          {pending ? <Loader /> : <Button onLoadMore={incrementPage} />}
        </>
      )}
    </div>
  );
};

export default App;
