import FilmCard from '../film-card/film-card';
import {useState, Fragment} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';

const mapStateToProps = ({suitableFilms}: State) => ({
  suitableFilms,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FilmsList(props: PropsFromRedux): JSX.Element {
  const [activeCard, setActiveCard] = useState(false);
  const {suitableFilms} = props;
  
  return (
    <Fragment>
      {
        suitableFilms.map((film) => {
          return <FilmCard film={film} key={film.id} />;
        })
      }
    </Fragment>
  );
}

export {FilmsList};
export default connector(FilmsList);