import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

const ImageGallery = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [largeImage, setLargeImage] = useState({
    imageToModal: '',
    tagToModal: '',
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      setIsModalVisible(false);
    }
  };

  const showModal = id => {
    for (let picture of props.pictures) {
      if (picture.id === id) {
        setLargeImage({
          imageToModal: picture.largeImageURL,
          tagToModal: picture.tags,
        });
      }
    }
    setIsModalVisible(true);
  };

  const hideModal = event => {
    if (event.target === event.currentTarget) {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <ul className={css.imageGallery}>
        {props.pictures.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tag={tags}
            onShowModal={() => showModal(id)}
          />
        ))}
      </ul>
      {isModalVisible && (
        <Modal
          imageModal={largeImage.imageToModal}
          tagModal={largeImage.tagToModal}
          onHide={hideModal}
        />
      )}
    </>
  );
};
export default ImageGallery;

ImageGalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(Object),
};
