import {memo} from 'react';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  film: Film;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film} = props;
  const {id, posterImage, title, previewVideoLink} = film;

  return (
    <article className='small-film-card catalog__films-card'>
      <VideoPlayer
        src={previewVideoLink}
        posterSrc={posterImage} />
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`films/${id}`}>{title}</Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
