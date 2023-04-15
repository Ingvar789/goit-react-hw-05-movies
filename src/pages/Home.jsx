import { getTrendings } from 'services/api';
import { useState, useEffect } from 'react';
import { TrendingMovies } from 'components/TrendingMovies/TrendingMovies';
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    const request = async () => {
      const r = await getTrendings();
      setMovies(r);
      console.log(r);
    };
    request();

    setInit(true);
  }, [init]);

  return <TrendingMovies movies={movies} />;
};
export default Home;
