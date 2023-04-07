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

  const data = [
    { brand: 'nike', price: 100 },
    { brand: 'nike', price: 300 },
    { brand: 'nike', price: 500 },
    { brand: 'adidas', price: 200 },
    { brand: 'adidas', price: 50 },
    { brand: 'puma', price: 150 },
    { brand: 'puma', price: 500 },
  ];

  const coutTotalPrice = data => {
    let totalNikePrice = 0;
    let totalAdidasPrice = 0;
    let totalPumaPrice = 0;
    data.map(({ brand, price }) => {
      if (brand === 'nike') {
        totalNikePrice += price;
      }
      if (brand === 'adidas') {
        totalAdidasPrice += price;
      }
      if (brand === 'puma') {
        totalPumaPrice += price;
      }
    });
    // data.forEach(shoes => {
    //   if (shoes.brand === 'nike') {
    //     totalNikePrice += shoes.price;
    //   }
    //   if (shoes.brand === 'adidas') {
    //     totalAdidasPrice += shoes.price;
    //   }
    //   if (shoes.brand === 'puma') {
    //     totalPumaPrice += shoes.price;
    //   }
    // });
    return console.log(
      `Nike:${totalNikePrice}, Adidas:${totalAdidasPrice}, Puma:${totalPumaPrice}`
    );
  };
  coutTotalPrice(data);

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
