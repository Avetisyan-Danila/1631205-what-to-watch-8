import FilmCard from '../film-card/film-card';
import {Fragment, memo} from 'react';
import {useSelector} from 'react-redux';
import {getFilms} from '../../store/films-data/selectors';
import {getSuitableFilms} from '../../store/films-process/selectors';

type FilmsListProps = {
  renderedFilmsCount: number;
};

function FilmsList(props: FilmsListProps): JSX.Element {
  const {renderedFilmsCount} = props;

  const films = useSelector(getFilms);
  const suitableFilms = useSelector(getSuitableFilms);

  return (
    <Fragment>
      {
        suitableFilms.slice(0, renderedFilmsCount).map((film) => {
          return <FilmCard film={film} key={film.id} />;
        })
      }
    </Fragment>
  );
}

export default memo(FilmsList);