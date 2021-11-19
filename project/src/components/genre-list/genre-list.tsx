import {useState, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeGenre, gettingListFilms} from '../../store/action';
import {Film} from '../../types/film';
import {getFilms} from '../../store/films-data/selectors';

function GenreList(): JSX.Element {
  const films = useSelector(getFilms);
  const dispatch = useDispatch();

  const [activeGenre, setActiveGenre] = useState(0);

  function clickEventHandler(id: number) {
    setActiveGenre(id);
  }

  const AllGenres: string[] = ['All genres'];
  const suitableFilms: Film[] = [];

  films.map((film) => {
    AllGenres.push(film.genre);
  })

  let uniqueGenres = Array.from(new Set(AllGenres));

  return (
    <ul className='catalog__genres-list'>
      {
        uniqueGenres.map((genre, index) => {
          const keyValue = `genre-${index}`;
          
          return <li key={keyValue} className={`catalog__genres-item ${activeGenre === index ? 'catalog__genres-item--active' : ''}`}><a href='#' className='catalog__genres-link' onClick={
            (e) => {
              e.preventDefault();
              
              clickEventHandler(index);
              
              if (genre === 'All genres') {
                dispatch(changeGenre('All genres'));
                dispatch(gettingListFilms(films));
                return;
              }

              films.forEach((film) => {
                if (film.genre === genre) {
                  suitableFilms.push(film);
                }
              });

              dispatch(changeGenre(genre));
              dispatch(gettingListFilms(suitableFilms));
            }
          }>{genre}</a></li>
        })
      }
    </ul>
  );
}

export default memo(GenreList);
