import {MouseEventHandler} from 'react';

type ShowMoreProps = {
  onShowMoreButtonClick: MouseEventHandler<HTMLElement>;
};

function ShowMore(props: ShowMoreProps): JSX.Element {
  const {onShowMoreButtonClick} = props;

  return (
    <div className='catalog__more'>
      <button className='catalog__button' type='button' onClick={onShowMoreButtonClick}>Show more</button>
    </div>
  );
}

export default ShowMore;
