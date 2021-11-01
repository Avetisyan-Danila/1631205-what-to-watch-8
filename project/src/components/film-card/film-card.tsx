import {Film} from '../../types/film';
import {Link, useHistory} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import {AppRoute} from '../../const';

type FilmCardProps = {
  film: Film;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const history = useHistory();
  
  const {film} = props;
  const {id, posterImage, title, previewVideoLink} = film;

  return (
    <article className='small-film-card catalog__films-card'>
      <VideoPlayer
        src={previewVideoLink}
        posterSrc={posterImage} />
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' onClick={() => 
          history.push(AppRoute.Film)
        } to={id}>{title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
