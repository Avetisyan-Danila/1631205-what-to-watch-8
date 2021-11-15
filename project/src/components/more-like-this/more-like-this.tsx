import {Link, useHistory} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Film} from '../../types/film';

type MoreLikeThisProps = {
  films: Film[];
  film: Film;
};

function MoreLikeThis(props: MoreLikeThisProps): JSX.Element {
  const history = useHistory();

  const {films, film} = props;

  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__films-list">
          {
            films.map((storageFilm, index) => {
              const keyValue = `film-${index}`;

              if (storageFilm.genre === film.genre && storageFilm.id !== film.id) {
                return (
                  <article className="small-film-card catalog__films-card" key={keyValue}>
                    <div className="small-film-card__image">
                      <img src={storageFilm.posterImage} alt={storageFilm.title} width="280" height="175" />
                    </div>
                    <h3 className='small-film-card__title'>
                      <Link className='small-film-card__link' to={`${storageFilm.id}`}>{storageFilm.title}</Link>
                    </h3>
                  </article>
                )
              }
            })
          }
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MoreLikeThis;
