import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getReviews } from 'services/api';
import { Loader } from 'components/Loader/Loader';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState({});
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    const request = async () => {
      const r = await getReviews(movieId);
      setReviews(r);
      console.log(r);
    };
    request();

    setInit(true);
  }, [init, movieId]);

  if (!reviews.id) {
    return <Loader />;
  }
  if (reviews.results.length === 0) {
    return <p>There are no reviews for this film.</p>;
  }
  return (
    <ul>
      {reviews.results.map(review => {
        return (
          <li key={review.id}>
            <p>{review.author}:</p>
            <p>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
};
export default Reviews;
