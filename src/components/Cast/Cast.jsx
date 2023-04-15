import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCast } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { IMAGE_BASE_URL } from 'services/api';

const Cast = () => {
  const { movieId } = useParams();
  const [credits, setCast] = useState({});
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    const request = async () => {
      const r = await getCast(movieId);
      setCast(r);
      console.log(r);
    };
    request();

    setInit(true);
  }, [init, movieId]);

  if (!credits.id) {
    return <Loader />;
  }
  return (
    <ul>
      {credits.cast.map(actor => {
        return (
          <li key={actor.cast_id}>
            {actor.profile_path && (
              <img
                src={IMAGE_BASE_URL + `/w200` + actor.profile_path}
                alt="actor"
              />
            )}
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
};
export default Cast;
