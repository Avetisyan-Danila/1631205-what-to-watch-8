import {useState} from 'react';
import FilmCard from '../film-card/film-card';
import {Film} from '../../types/film';

type Props = {
  films: Film[];
}

function FilmsList({films}: Props): JSX.Element[] {
  const [activeCard, setActiveCard] = useState(false);

  return (
    films.map((film) => {
      return <FilmCard film={film} key={film.id}/>;
    })
  );
}

export default FilmsList;
