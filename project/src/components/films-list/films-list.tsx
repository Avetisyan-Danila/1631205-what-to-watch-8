import FilmCard from '../film-card/film-card';
import {useState, Fragment, memo} from 'react';
import {useSelector} from 'react-redux';
import {getFilms} from '../../store/films-data/selectors';
import {getSuitableFilms} from '../../store/films-process/selectors';

function FilmsList(): JSX.Element {
  const films = useSelector(getFilms);
  const suitableFilms = useSelector(getSuitableFilms);

  const [activeCard, setActiveCard] = useState(false);
  
  return (
    <Fragment>
      {
        suitableFilms.length === 0 ?
        films.map((film) => {
          return <FilmCard film={film} key={film.id} />;
        })
        :
        suitableFilms.map((film) => {
          return <FilmCard film={film} key={film.id} />;
        })
      }
    </Fragment>
  );
}

export default memo(FilmsList);