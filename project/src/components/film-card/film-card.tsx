import {Film} from '../../types/film';
import {Link, useHistory} from 'react-router-dom';
import {AppRoute} from '../../const';

type FilmCardProps = {
  film: Film;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const history = useHistory();
  
  const {film} = props;
  const {posterImage, title} = film;

  return (
    <article className='small-film-card catalog__films-card'>
      <div className='small-film-card__image'>
        <img src={posterImage} alt='Fantastic Beasts: The Crimes of Grindelwald' width='280' height='175' />
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' onClick={() => history.push(AppRoute.Film)} to={title}>{title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
