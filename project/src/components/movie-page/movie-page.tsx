import {Fragment, useState} from 'react';
import {useParams, useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import Tabs from '../tabs/tabs'
import MoreLikeThis from '../more-like-this/more-like-this'
import {useSelector, useDispatch} from 'react-redux';
import {getFilms} from '../../store/films-data/selectors';
import {AppRoute} from '../../const';
import {addFavoriteFilmAction, removeFavoriteFilmAction} from '../../store/api-actions';

type RouteParams = {
  id: string;
}

function MoviePage(): JSX.Element {
  const films = useSelector(getFilms);
  const {id} = useParams<RouteParams>();
  
  const film = films[Number(id) - 1];
  const [isFavorite, setIsFavorite] = useState(film.isFavorite);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Fragment>
      <section className='film-card film-card--full' style={{background: `${film.backgroundColor}`}}>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={film.backgroundImage} alt={film.title} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <header className='page-header film-card__head'>
            <div className='logo'>
              <a onClick={(e) => {e.preventDefault();history.push(AppRoute.Root)}} href='' className='logo__link'>
                <span className='logo__letter logo__letter--1'>W</span>
                <span className='logo__letter logo__letter--2'>T</span>
                <span className='logo__letter logo__letter--3'>W</span>
              </a>
            </div>

            <ul className='user-block'>
              <li className='user-block__item'>
                <div className='user-block__avatar'>
                  <img src='img/avatar.jpg' alt='User avatar' width='63' height='63' />
                </div>
              </li>
              <li className='user-block__item'>
                <a className='user-block__link'>Sign out</a>
              </li>
            </ul>
          </header>

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{film.title}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{film.genre}</span>
                <span className='film-card__year'>{film.year}</span>
              </p>

              <div className='film-card__buttons'>
                <Link className='film-card__button' style={{textDecoration: 'none'}} onClick={() => history.push(AppRoute.Player)} to={id}>
                  <button className='btn btn--play film-card__button' type='button'>
                    <svg viewBox='0 0 19 19' width='19' height='19'>
                      <use xlinkHref='#play-s'></use>
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>
                <button className='btn btn--list film-card__button' type='button' onClick={() => {
                  if (film.isFavorite === true) {
                    dispatch(removeFavoriteFilmAction(film.id));
                    setIsFavorite(false);
                  }
                  else {
                    dispatch(addFavoriteFilmAction(film.id));
                    setIsFavorite(true);
                  }
                }}>
                  {
                    isFavorite === true ?
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                    :
                    <svg viewBox='0 0 19 20' width='19' height='20'>
                      <use xlinkHref='#add'></use>
                    </svg>
                  }
                  <span>My list</span>
                </button>
                <a href='add-review.html' className='btn film-card__button'>Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <Tabs film={film} />
        </div>
      </section>

      <MoreLikeThis films={films} film={film}/>
    </Fragment>
  );
}
export default MoviePage;
