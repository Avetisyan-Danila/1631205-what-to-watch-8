import {Fragment, useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import Tabs from '../tabs/tabs'
import LoadingScreen from '../loading-screen/loading-screen'
import NotFoundScreen from '../not-found-screen/not-found-screen'
import MoreLikeThis from '../more-like-this/more-like-this'
import {useSelector} from 'react-redux';
import {getFilms} from '../../store/films-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AppRoute, APIRoute, AuthorizationStatus} from '../../const';
import {Film} from '../../types/film';
import {Comment} from '../../types/comment';
import {api} from '../../index'
import {adapter} from '../../film';
import browserHistory from '../../browser-history';
import Header from '../header/header'

type RouteParams = {
  id: string;
}

function MoviePage(): JSX.Element {
  const {id} = useParams<RouteParams>();
  const history = useHistory();
  const films = useSelector(getFilms);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const [currentFilm, setcurrentFilm] = useState<Film | null>(null);
  const [filmComments, setFilmComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    api.get<Film>(`${APIRoute.Films}/${id}`)
    .then(({data}) => {
      setcurrentFilm(adapter(data));
    })
  }, [id]);

  useEffect(() => {
    api.get(`${APIRoute.Comments}/${id}`)
    .then(({data}) => {
      setFilmComments(data);
      console.log(data);
    })
  }, [id]);

  const handleTest = () => {
    if (currentFilm) {
      api.post(`${APIRoute.FavoriteFilm}/${currentFilm.id}/${Number(!currentFilm.isFavorite)}`)
      .then(({data}) => {
        setcurrentFilm(adapter(data));
      })
    }
  };

  return !!currentFilm && !!filmComments ? (
    <Fragment>
      <section className='film-card film-card--full' style={{background: `${currentFilm.backgroundColor}`}}>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={currentFilm.backgroundImage} alt={currentFilm.title} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <Header class={'film-card__head'} />

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{currentFilm.title}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{currentFilm.genre}</span>
                <span className='film-card__year'>{currentFilm.year}</span>
              </p>

              <div className='film-card__buttons'>
                <Link className='film-card__button' style={{textDecoration: 'none'}} onClick={() => history.push(AppRoute.Player)} to={id}>
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
                {
                  authorizationStatus === AuthorizationStatus.Auth ?
                  <a href='add-review.html' className='btn film-card__button' onClick={(e) => {e.preventDefault(); browserHistory.push(`${currentFilm.id}/review`)}}>Add review</a>
                  :
                  ''
                }
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <Tabs film={currentFilm} comments={filmComments} />
        </div>
      </section>

      <MoreLikeThis film={currentFilm} />
    </Fragment>
  )
  :
  (
    Number(id) > films.length ?
    <NotFoundScreen />
    :
    <LoadingScreen />
    
  )
}
export default MoviePage;
