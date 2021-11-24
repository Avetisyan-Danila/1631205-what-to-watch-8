import {Link} from 'react-router-dom';
import {Film} from '../../types/film';
import {useState, useEffect} from 'react';
import {APIRoute} from '../../const';
import {api} from '../../index';
import {adapter} from '../../film';
import LoadingScreen from '../loading-screen/loading-screen';
import Footer from '../footer/footer';
import VideoPlayer from '../video-player/video-player';
import {useDispatch} from 'react-redux';
import {fetchCertainFilmAction} from '../../store/api-actions';

type MoreLikeThisProps = {
  film: Film;
};

function MoreLikeThis(props: MoreLikeThisProps): JSX.Element {
  const {film} = props;
  const [similarFilms, setSimilarFilms] = useState<Film[] | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get(`${APIRoute.Films}/${film.id}/similar`)
      .then(({data}) => {
        const dataUIFormat: Film[] = [];

        data.map((fimilarFilm: Film) => {
          dataUIFormat.push(adapter(fimilarFilm));
        });

        setSimilarFilms(dataUIFormat);
      });
  }, []);

  return similarFilms ? (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__films-list">
          {
            similarFilms.map((similarFilm, index) => {
              const keyValue = `film-${index}`;

              if (similarFilm.genre === film.genre && similarFilm.id !== film.id) {
                return (
                  <article key={keyValue} className='small-film-card catalog__films-card'>
                    <Link onClick={() => dispatch(fetchCertainFilmAction(similarFilm.id))} className='small-film-card__link' to={`films/${similarFilm.id}`}>
                      <VideoPlayer src={similarFilm.previewVideoLink} posterSrc={similarFilm.posterImage} />
                    </Link>
                    <h3 className='small-film-card__title'>
                      <Link onClick={() => dispatch(fetchCertainFilmAction(similarFilm.id))} className='small-film-card__link' to={`films/${similarFilm.id}`}>{similarFilm.title}</Link>
                    </h3>
                  </article>
                );
              }
            })
          }
        </div>
      </section>

      <Footer />
    </div>
  )
    :
    (
      <LoadingScreen />
    );
}

export default MoreLikeThis;
