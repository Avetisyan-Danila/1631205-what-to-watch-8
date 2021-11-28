import {Comment} from '../../types/comment';

type TabsProps = {
  comments: Comment[];
};

function TabsReviews(props: TabsProps): JSX.Element {
  const {comments} = props;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          comments.map((comment, index) => {
            const keyValue = `comment-${index}`;
            const date = new Date(comment.date);
            const dateMonth = date.toLocaleDateString('en', { month: 'long' });
            const dateDay = date.toLocaleDateString('en', {day: 'numeric'});
            const dateYear = date.toLocaleDateString('en', {year: 'numeric'});

            return (
              <div className="review" key={keyValue}>
                <blockquote className="review__quote">
                  <p className="review__text">{comment.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{comment.user.name}</cite>
                    <time className="review__date" dateTime={`${comment.date}`}>{`${dateMonth} ${dateDay}, ${dateYear}`}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{comment.rating}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default TabsReviews;
