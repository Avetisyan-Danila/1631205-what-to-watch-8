import {Fragment, useEffect} from 'react';
import {AuthorizationStatus, AppRoute, UserInformation} from '../../const';
import {useSelector, useDispatch} from 'react-redux';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {logoutAction} from '../../store/api-actions';
import {Link} from 'react-router-dom';
import {useHistory, useRouteMatch} from 'react-router';
import {Film} from '../../types/film';
import {toast} from 'react-toastify';

type HeaderProps = {
  class: string;
  film?: Film;
  isSingInPage?: boolean;
};

function Header(props: HeaderProps): JSX.Element {
  const {path} = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const authorizationStatus = useSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth && path !== '/login') {
      toast.info(UserInformation.AuthFailMessage);
    }
  }, [authorizationStatus]);

  return (
    <header className={`page-header ${props.class}`}>
      <div className='logo'>
        <a href='' className='logo__link' onClick={(e) => {e.preventDefault(); history.push(`${AppRoute.Root}`);}}>
          <span className='logo__letter logo__letter--1'>W</span>
          <span className='logo__letter logo__letter--2'>T</span>
          <span className='logo__letter logo__letter--3'>W</span>
        </a>
      </div>

      {
        props.class === 'user-page__head' && props.isSingInPage === false ?
          <h1 className='page-title user-page__title'>My list</h1>
          :
          ''
      }

      {
        props.class === 'user-page__head' && props.isSingInPage === true ?
          <h1 className='page-title user-page__title'>Sign in</h1>
          :
          ''
      }

      {
        props.film ?
          <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
              <li className='breadcrumbs__item'>
                <Link onClick={() => history.push(AppRoute.Film)} to={`${props.film.id}`} className='breadcrumbs__link'>{props.film.title}</Link>
              </li>
              <li className='breadcrumbs__item'>
                <a className='breadcrumbs__link'>Add review</a>
              </li>
            </ul>
          </nav>
          :
          ''
      }

      {
        path === '/login' ?
          ''
          :
          <ul className='user-block'>
            {
              authorizationStatus === AuthorizationStatus.Auth ?
                <Fragment>
                  <li className='user-block__item'>
                    <div className='user-block__avatar' onClick={() => history.push(`${AppRoute.MyList}`)}>
                      <img src='img/avatar.jpg' alt='User avatar' width='63' height='63' />
                    </div>
                  </li>
                  <li className='user-block__item'>
                    <a className='user-block__link' onClick={(e) => { e.preventDefault(); dispatch(logoutAction()); }}>Sign out</a>
                  </li>
                </Fragment>
                :
                <Link className="user-block__link" to={AppRoute.Login}>Sign in</Link>
            }
          </ul>
      }
    </header>
  );
}

export default Header;
