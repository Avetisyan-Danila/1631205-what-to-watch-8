import FavoriteFilmsList from '../favorite-films-list/favorite-films-list';
import Header from '../header/header';
import Footer from '../footer/footer';

function MyList(): JSX.Element {
  return (
    <div className='user-page'>
      <Header class={'user-page__head'} />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <div className='catalog__films-list'>
          <FavoriteFilmsList />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
