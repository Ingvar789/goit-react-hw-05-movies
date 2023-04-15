import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SSearchForm = styled.form`
  padding: 10px;
  button {
    margin-left: 10px;
    border-radius: 10px;
  }
`;
const Searchbar = props => {
  const [searchQuery, setSearchQuery] = useState(props.query ?? '');

  const handleNameChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.error('Empty search!');
    }
    props.onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header>
      <SSearchForm onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search film"
          onChange={handleNameChange}
          defaultValue={props.query}
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </SSearchForm>
    </header>
  );
};

export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
