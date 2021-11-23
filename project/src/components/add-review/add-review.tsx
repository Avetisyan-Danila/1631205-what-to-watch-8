import PostCommentForm from '../post-comment-form/post-comment-form';
import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {getFilms} from '../../store/films-data/selectors';
import Header from '../header/header';

type RouteParams = {
  id: string;
}

function AddReview(): JSX.Element {
  const films = useSelector(getFilms);
  const {id} = useParams<RouteParams>();

  const film = films[Number(id) - 1];
  
  return (
    <section className='film-card film-card--full' style={{background: `${film.backgroundColor}`}}>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={film.backgroundImage} alt={film.title} />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <Header class={''} film={film} />

        <div className='film-card__poster film-card__poster--small'>
          <img src={film.posterImage} alt='The Grand Budapest Hotel poster' width='218' height='327' />
        </div>
      </div>

      <PostCommentForm film={film} />

    </section>
  );
}

export default AddReview;
