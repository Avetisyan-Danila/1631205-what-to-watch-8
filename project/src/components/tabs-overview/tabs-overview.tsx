import {Fragment} from 'react';
import {Film} from '../../types/film';

type TabsProps = {
  film: Film;
};

function TabsOverview(props: TabsProps): JSX.Element {
  const {film} = props;

  return (
    <Fragment>
      <div className='film-rating'>
        <div className='film-rating__score'>{film.rating}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>{film.ratingDescription}</span>
          <span className='film-rating__count'>{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className='film-card__text'>
        <p>{film.description}</p>

        <p className='film-card__director'><strong>Director: {film.director}</strong></p>

        <p className='film-card__starring'><strong>Starring: {film.starring.join(', ')} and other</strong></p>
      </div>
    </Fragment>
  );
}

export default TabsOverview;
