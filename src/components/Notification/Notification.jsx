import React from 'react';
import PropTypes from 'prop-types';
import { NotificationStyled } from './Notification.styled';
const Notification = ({ message }) => (
  <NotificationStyled>{message}</NotificationStyled>
);

export default Notification;

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
