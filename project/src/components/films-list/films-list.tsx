import FilmCard from '../film-card/film-card';

function FilmsList({films}: any[]): JSX.Element {
  return (
    films.map((film) => {
      <FilmCard film={film} />;
    })
  );
}

export default FilmsList;
