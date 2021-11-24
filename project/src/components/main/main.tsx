import React from 'react';
import {useState, useEffect} from 'react';
import FilmsList from '../films-list/films-list';
import GenreList from '../genre-list/genre-list';
import ShowMore from '../show-more/show-more';
import {useSelector, useDispatch} from 'react-redux';
import {FILMS_COUNT_PER_STEP, APIRoute} from '../../const';
import {getFilms} from '../../store/films-data/selectors';
import {getSuitableFilms} from '../../store/films-process/selectors';
import {fetchFilmAction} from '../../store/api-actions';
import {api} from '../../index';
import {AppRoute} from '../../const';
import {adapter} from '../../film';
import {Film} from '../../types/film';
import LoadingScreen from '../loading-screen/loading-screen'
import Header from '../header/header'
import Footer from '../footer/footer'
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';

function Main(): JSX.Element {
  const [renderedFilmsCount, setRenderedFilmsCount] = useState(FILMS_COUNT_PER_STEP);
  const films = useSelector(getFilms);
  const suitableFilms = useSelector(getSuitableFilms);

  const [currentFilm, setcurrentFilm] = useState<Film | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleTest = () => {
    if (currentFilm) {
      api.post(`${APIRoute.FavoriteFilm}/${currentFilm.id}/${Number(!currentFilm.isFavorite)}`)
      .then(({data}) => {
        setcurrentFilm(adapter(data));
      })
    }
  }

  useEffect(() => {
    dispatch(fetchFilmAction());
  }, []);

  useEffect(() => {
    if (films.length) {
      api.get(`promo`)
      .then(({data}) => {
        setcurrentFilm(adapter(data));
      })
    }
  }, [films]);

  return !!currentFilm ? (
    <React.Fragment>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src='img/bg-the-grand-budapest-hotel.jpg' alt='The Grand Budapest Hotel' />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <Header class={'film-card__head'} />

        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img src={currentFilm.posterImage} alt={currentFilm.title} width='218' height='327' />
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{currentFilm.title}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{currentFilm.genre}</span>
                <span className='film-card__year'>{currentFilm.year}</span>
              </p>

              <div className='film-card__buttons'>
                <Link className='film-card__button' style={{textDecoration: 'none'}} onClick={() => history.push(AppRoute.Player)} to={`${currentFilm.id}`}>
                  <button className='btn btn--play' type='button'>
                    <svg viewBox='0 0 19 19' width='19' height='19'>
                      <use xlinkHref='#play-s'></use>
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>
                <button className='btn btn--list film-card__button' type='button' onClick={handleTest}>
                  {
                    currentFilm.isFavorite === true ?
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

        <Footer />
      </div>
    </React.Fragment>
  )
  :
  (
    <LoadingScreen />
  )
}

export default Main;
