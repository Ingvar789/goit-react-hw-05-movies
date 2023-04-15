// імпорт компонент
import { lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import Home from 'pages/Home';
import Cast from 'components/Cast/Cast';
import Reviews from 'components/Reviews/Reviews';

const Movies = lazy(() => import('pages/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));

const StyledLink = styled(NavLink)`
  text-decoration: none;
  width: 85px;
  color: black;

  &.active {
    color: orange;
  }
`;
const StyledNav = styled.nav`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 2px solid black;
`;
const App = () => {
  return (
    <Suspense>
      <StyledNav>
        <StyledLink to={'/'}>Home</StyledLink>
        <StyledLink to={'/movies'}>Movies</StyledLink>
      </StyledNav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
