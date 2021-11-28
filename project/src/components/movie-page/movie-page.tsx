import {Fragment, useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router';
import Tabs from '../tabs/tabs';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import MoreLikeThis from '../more-like-this/more-like-this';
import {useSelector} from 'react-redux';
import {getFilms} from '../../store/films-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AppRoute, APIRoute, AuthorizationStatus} from '../../const';
import {Film} from '../../types/film';
import {Comment} from '../../types/comment';
import {api} from '../../index';
import {adapter} from '../../film';
import Header from '../header/header';

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

  const renderEmptyData = () => (
    Number(id) > films.length ?
      <NotFoundScreen />
      :
      <LoadingScreen />
  );

  useEffect(() => {
    api.get<Film>(`${APIRoute.Films}/${id}`)
      .then(({data}) => {
        setcurrentFilm(adapter(data));
      });
  }, [id]);

  useEffect(() => {
    api.get(`${APIRoute.Comments}/${id}`)
      .then(({data}) => {
        setFilmComments(data);
      });
  }, [id]);

  const handleToggleIsFavorite = () => {
    if (currentFilm) {
      api.post(`${APIRoute.FavoriteFilm}/${currentFilm.id}/${Number(!currentFilm.isFavorite)}`)
        .then(({data}) => {
          setcurrentFilm(adapter(data));
        });
    }
  };

  const renderFavoriteIcon = () => {
    if (currentFilm?.isFavorite === true) {
      return (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      );
    }
    return (
      <svg viewBox='0 0 19 20' width='19' height='20'>
        <use xlinkHref='#add'></use>
      </svg>);
  };

  const renderAddReviewButton = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      return <a href='add-review.html' className='btn film-card__button' onClick={(e) => {e.preventDefault(); history.push(`${currentFilm?.id}/review`);}}>Add review</a>;
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
                <button onClick={() => history.push(AppRoute.Player.replace(':id', id))} className='film-card__button btn btn--play' type='button'>
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className='btn btn--list film-card__button' type='button' onClick={handleToggleIsFavorite}>
                  {
                    renderFavoriteIcon()
                  }
                  <span>My list</span>
                </button>
                {
                  renderAddReviewButton()
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
    renderEmptyData();
}
export default MoviePage;
