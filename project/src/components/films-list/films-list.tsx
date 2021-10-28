import FilmCard from '../film-card/film-card';
import {useState} from 'react';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {changeGenre, GettingListFilms} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import {Film} from '../../types/film';

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

function FilmsList(props: ConnectedComponentProps): JSX.Element[] {
  const [activeCard, setActiveCard] = useState(false);
  const {films, onGenreChange, onFilmsChange} = props;

  return (
    films.map((film) => {
      return <FilmCard film={film} key={film.id}/>;
    })
  );
}

export default FilmsList;
