import {Film} from '../../types/film';
import PostCommentForm from '../post-comment-form/post-comment-form';

type Props = {
  films: Film[];
}

function AddReview({films}: Props): JSX.Element {
  return (
    <section className='film-card film-card--full'>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src='img/bg-the-grand-budapest-hotel.jpg' alt='The Grand Budapest Hotel' />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header'>
          <div className='logo'>
            <a href='main.html' className='logo__link'>
              <span className='logo__letter logo__letter--1'>W</span>
              <span className='logo__letter logo__letter--2'>T</span>
              <span className='logo__letter logo__letter--3'>W</span>
            </a>
          </div>

          <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
              <li className='breadcrumbs__item'>
                <a href='film-page.html' className='breadcrumbs__link'>{films[0].title}</a>
              </li>
              <li className='breadcrumbs__item'>
                <a className='breadcrumbs__link'>Add review</a>
              </li>
            </ul>
          </nav>

          <ul className='user-block'>
            <li className='user-block__item'>
              <div className='user-block__avatar'>
                <img src='img/avatar.jpg' alt='User avatar' width='63' height='63' />
              </div>
            </li>
            <li className='user-block__item'>
              <a className='user-block__link'>Sign out</a>
            </li>
          </ul>
        </header>

        <div className='film-card__poster film-card__poster--small'>
          <img src={films[0].posterImage} alt='The Grand Budapest Hotel poster' width='218' height='327' />
        </div>
      </div>

      <PostCommentForm/>

    </section>
  );
}

export default AddReview;
