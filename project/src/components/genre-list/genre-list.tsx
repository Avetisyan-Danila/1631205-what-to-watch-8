import {useState} from 'react';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {changeGenre, GettingListFilms} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import {Film} from '../../types/film';
import {films as initialFilms} from '../../mocks/films';

const mapStateToProps = ({films}: State) => ({
  films,
});
const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onGenreChange(genre: string) {
    dispatch(changeGenre(genre));
  },
  onFilmsChange(films: Film[]) {
    dispatch(GettingListFilms(films));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function GenreList(props: ConnectedComponentProps): JSX.Element {
  const [activeGenre, setActiveGenre] = useState(0);

  function clickEventHandler(id: number) {
    setActiveGenre(id);
  }

  const {films, onGenreChange, onFilmsChange} = props;

  const AllGenres: string[] = ['All genres'];
  let suitableFilms: Film[] = [];

  initialFilms.map((film) => {
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
                onGenreChange('All genres');
                onFilmsChange(initialFilms);
                return;
              }

              initialFilms.forEach((film) => {
                if (film.genre === genre) {
                  suitableFilms.push(film);
                }
              });

              onGenreChange(genre);
              onFilmsChange(suitableFilms);
            }
          }>{genre}</a></li>
        })
      }
    </ul>
  );
}

export {GenreList};
export default connector(GenreList);
