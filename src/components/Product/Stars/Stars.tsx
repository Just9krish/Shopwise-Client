import { FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import { IStarsProps } from '../../../Interface';

export default function Stars({ stars }: IStarsProps) {
  const starRating = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    let starIcon;

    if (stars >= index + 1) {
      starIcon = <FaStar title="Ratings" />;
    } else if (stars >= number) {
      starIcon = <FaStarHalfAlt title="Ratings" />;
    } else {
      starIcon = <FiStar title="Ratings" />;
    }

    return <span key={index}>{starIcon}</span>;
  });

  return <div className="flex text-orange-400 items-center gap-1">{starRating}</div>;
}
