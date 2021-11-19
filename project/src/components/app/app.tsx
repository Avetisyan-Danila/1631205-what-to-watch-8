import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRoute} from '../../const';
import Main from '../main/main';
import AddReview from '../add-review/add-review';
import MoviePage from '../movie-page/movie-page';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import {isCheckedAuth} from '../../film';
import browserHistory from '../../browser-history';
import {getFilms} from '../../store/films-data/selectors';
import {getLoadedDataStatus} from '../../store/films-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type AppScreenProps = {
  title: string;
  genre: string;
  releaseDate: number;
}

function App(props: AppScreenProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus)
  const isDataLoaded = useSelector(getLoadedDataStatus)
  const films = useSelector(getFilms)

  const {title, genre, releaseDate} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main
            title={title}
            genre={genre}
            releaseDate={releaseDate}
          />
        </Route>
        <Route exact path={AppRoute.Login}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Film}>
          <MoviePage />
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReview films={films} />
        </Route>
        <Route exact path={AppRoute.Player}>
          <Player films={films} />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
