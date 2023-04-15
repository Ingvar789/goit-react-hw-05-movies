import { getMovieDetails } from 'services/api';
import { useState, useEffect } from 'react';
import {
  Outlet,
  useParams,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { IMAGE_BASE_URL } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import styled from 'styled-components';

const SMovieTitle = styled.h2`
  text-align: center;
`;
const SMovieWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const SMovieContainer = styled.div`
  display: flex;
`;
const SMovieDetails = styled.div`
  padding-left: 20px;
`;
// const SMovie
const MovieDetails = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    const request = async () => {
      const r = await getMovieDetails(movieId);
      setMovie(r);
      console.log(r);
    };
    request();

    setInit(true);
  }, [init, movieId]);
  const releaseYear = new Date(movie.release_date).getFullYear();
  if (!movie.id) {
    return <Loader />;
  }
  return (
    <>
      <SMovieWrapper>
        <button onClick={() => navigate(location.state.from)}>Go back</button>
        <SMovieTitle>
          {movie.name ?? movie.title} ({releaseYear || ''})
        </SMovieTitle>
        <SMovieContainer>
          <img
            src={IMAGE_BASE_URL + `/w400` + movie.poster_path}
            alt="Movie poster"
          />
          <SMovieDetails>
            <div>
              <p>User score {Math.ceil(movie.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            <div>
              <h4>Genres</h4>
              <div>
                {movie.genres &&
                  movie.genres
                    .map(genre => {
                      return genre.name;
                    })
                    .join(', ')}
              </div>
            </div>
          </SMovieDetails>
        </SMovieContainer>
        <ul>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </SMovieWrapper>
    </>
  );
};
export default MovieDetails;
