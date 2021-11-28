import {useState, useEffect, memo, MouseEventHandler} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeGenre, gettingListFilms} from '../../store/action';
import {Film} from '../../types/film';
import {getFilms} from '../../store/films-data/selectors';
import {getGenre} from '../../store/films-process/selectors';

type GenreListProps = {
  onGenreChange: MouseEventHandler<HTMLElement>;
};

const defaultGenre = 'All genres';

function GenreList(props: GenreListProps): JSX.Element {
  const {onGenreChange} = props;
  const films = useSelector(getFilms);
  const storeGenre = useSelector(getGenre);
  const dispatch = useDispatch();

  const [activeGenre, setActiveGenre] = useState(0);

  function clickEventHandler(id: number) {
    setActiveGenre(id);
  }

  const allGenres: string[] = [defaultGenre];
  const suitableFilms: Film[] = [];

  useEffect(() => {
    if (storeGenre === defaultGenre) {
      dispatch(gettingListFilms(films));
    }
  }, []);

  films.map((film) => {
    allGenres.push(film.genre);
  });

  const uniqueGenres = Array.from(new Set(allGenres));

  return (
    <ul className='catalog__genres-list'>
      {
        uniqueGenres.map((genre, index) => {
          const keyValue = `genre-${index}`;

          return (
            <li onClick={onGenreChange} key={keyValue} className={`catalog__genres-item ${activeGenre === index ? 'catalog__genres-item--active' : ''}`}>
              <a href='#' className='catalog__genres-link' onClick={
                (e) => {
                  e.preventDefault();

                  clickEventHandler(index);

                  if (genre === defaultGenre) {
                    dispatch(changeGenre(defaultGenre));
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
              }
              >{genre}
              </a>
            </li>
          );
        })
      }
    </ul>
  );
}

export default memo(GenreList);
