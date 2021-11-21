import FilmCard from '../film-card/film-card';
import {Fragment, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFavoriteFilmAction} from '../../store/api-actions';
import {getFavoriteFilms} from '../../store/films-data/selectors';

function FavoriteFilmsList(): JSX.Element {
  const dispatch = useDispatch();
  dispatch(fetchFavoriteFilmAction());

  const films = useSelector(getFavoriteFilms);

  return (
    <Fragment>
      {
        films.map((film) => {
          if (film.isFavorite === true) {
            return <FilmCard film={film} key={film.id} />;
          }
        })
      }
    </Fragment>
  );
}

export default memo(FavoriteFilmsList);