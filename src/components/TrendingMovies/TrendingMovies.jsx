import { Link } from 'react-router-dom';
export const TrendingMovies = ({ movies }) => {
  return (
    <ul>
      {movies &&
        movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: '/' }}>
              {movie.name ?? movie.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};
