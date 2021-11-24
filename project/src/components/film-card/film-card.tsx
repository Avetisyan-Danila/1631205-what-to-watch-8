import {memo} from 'react';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import {useDispatch} from 'react-redux';
import {fetchCertainFilmAction} from '../../store/api-actions';

type FilmCardProps = {
  film: Film;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film} = props;
  const {id, posterImage, title, previewVideoLink} = film;
  const dispatch = useDispatch();

  return (
    <article className='small-film-card catalog__films-card'>
      <Link onClick={() => dispatch(fetchCertainFilmAction(id))} className='small-film-card__link' to={`films/${id}`}>
        <VideoPlayer src={previewVideoLink} posterSrc={posterImage} />
      </Link>
      <h3 className='small-film-card__title'>
        <Link onClick={() => dispatch(fetchCertainFilmAction(id))} className='small-film-card__link' to={`films/${id}`}>{title}</Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
