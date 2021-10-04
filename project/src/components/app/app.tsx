import Main from '../main/main';

type AppScreenProps = {
  title: string;
  genre: string;
  releaseDate: number;
}

function App({ title, genre, releaseDate }: AppScreenProps): JSX.Element {
  return (
    <Main
      title = {title}
      genre={genre}
      releaseDate={releaseDate}
    />
  );
}

export default App;
