import React from 'react';
import {useState} from 'react';
import FilmsList from '../films-list/films-list';
import GenreList from '../genre-list/genre-list';
import ShowMore from '../show-more/show-more';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {AuthorizationStatus, AppRoute, FILMS_COUNT_PER_STEP} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getFilms} from '../../store/films-data/selectors';
import {getSuitableFilms} from '../../store/films-process/selectors';
import browserHistory from '../../browser-history';
import {addFavoriteFilmAction, removeFavoriteFilmAction} from '../../store/api-actions';

function Main(): JSX.Element {
  const [renderedFilmsCount, setRenderedFilmsCount] = useState(FILMS_COUNT_PER_STEP);
  const films = useSelector(getFilms);
  const suitableFilms = useSelector(getSuitableFilms);

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const [isFavorite, setIsFavorite] = useState(films[0].isFavorite);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src='img/bg-the-grand-budapest-hotel.jpg' alt='The Grand Budapest Hotel' />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header film-card__head'>
          <div className='logo'>
            <a className='logo__link'>
              <span className='logo__letter logo__letter--1'>W</span>
              <span className='logo__letter logo__letter--2'>T</span>
              <span className='logo__letter logo__letter--3'>W</span>
            </a>
          </div>

          <ul className='user-block'>
            {
              authorizationStatus === AuthorizationStatus.Auth ?
              <React.Fragment>
                <li className='user-block__item'>
                  <div className='user-block__avatar'>
                    <img src='img/avatar.jpg' alt='User avatar' width='63' height='63' />
                  </div>
                </li>
                <li className='user-block__item'>
                  <a className='user-block__link' onClick={(e) => {e.preventDefault(); dispatch(logoutAction());}}>Sign out</a>
                </li>
              </React.Fragment>
              :
              <Link className="user-block__link" to={AppRoute.Login}>Sign in</Link>
            }
          </ul>
        </header>

        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img src={films[0].posterImage} alt={films[0].title} width='218' height='327' />
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{films[0].title}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{films[0].genre}</span>
                <span className='film-card__year'>{films[0].year}</span>
              </p>

              <div className='film-card__buttons'>
                <button className='btn btn--play film-card__button' type='button' onClick={() => browserHistory.push(`player/${films[0].id}`)}>
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className='btn btn--list film-card__button' type='button' onClick={() => {
                  if (films[0].isFavorite === true) {
                    dispatch(removeFavoriteFilmAction(films[0].id));
                    setIsFavorite(false);
                  }
                  else {
                    dispatch(addFavoriteFilmAction(films[0].id));
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <GenreList onGenreChange={() => setRenderedFilmsCount(FILMS_COUNT_PER_STEP)} />

          <div className='catalog__films-list'>
            <FilmsList renderedFilmsCount={renderedFilmsCount} />
          </div>

          {
            renderedFilmsCount > suitableFilms.length ?
            ''
            :
            suitableFilms.length > FILMS_COUNT_PER_STEP ?
              <ShowMore onShowMoreButtonClick={() => setRenderedFilmsCount((prevCount) => prevCount + FILMS_COUNT_PER_STEP)} />
              :
              ''
          }
        </section>

        <footer className='page-footer'>
          <div className='logo'>
            <a className='logo__link logo__link--light'>
              <span className='logo__letter logo__letter--1'>W</span>
              <span className='logo__letter logo__letter--2'>T</span>
              <span className='logo__letter logo__letter--3'>W</span>
            </a>
          </div>

          <div className='copyright'>
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Main;
