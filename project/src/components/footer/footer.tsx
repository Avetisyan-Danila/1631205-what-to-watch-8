import {AppRoute} from '../../const';
import {useHistory} from 'react-router';

function Footer(): JSX.Element {
  const history = useHistory();

  return (
    <footer className='page-footer'>
      <div className='logo'>
        <a href='' className='logo__link logo__link--light' onClick={(e) => {e.preventDefault(); history.push(`${AppRoute.Root}`);}}>
          <span className='logo__letter logo__letter--1'>W</span>
          <span className='logo__letter logo__letter--2'>T</span>
          <span className='logo__letter logo__letter--3'>W</span>
        </a>
      </div>

      <div className='copyright'>
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
