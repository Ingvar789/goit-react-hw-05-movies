import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { FeedbackOptionsStyled } from './FeedbackOptions.styled';
const FeedbackOptions = ({ options, onLeaveFeedback }) => (
  <FeedbackOptionsStyled>
    {options.map(buttonName => (
      <li key={shortid.generate()}>
        <button
          type="button"
          name={buttonName}
          className="TodoList__btn"
          onClick={onLeaveFeedback}
        >
          {buttonName}
        </button>
      </li>
    ))}
  </FeedbackOptionsStyled>
);

export default FeedbackOptions;

FeedbackOptions.propTypes = {
  onLeaveFeedback: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
