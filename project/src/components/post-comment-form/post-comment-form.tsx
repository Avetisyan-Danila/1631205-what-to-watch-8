import {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {Film} from '../../types/film';
import {APIRoute} from '../../const';
import {api} from '../../index';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router';

const POST_COMMENT_FAIL_MESSAGE = 'Сервер не доступен';
const FORM_MIN_LENGTH_FAIL_MESSAGE = 'Минимальная длина отзыва 50 символов';
const FORM_MAX_LENGTH_FAIL_MESSAGE = 'Максимальная длина отзыва 400 символов';
const FORM_EMPTY_SCORE_FAIL_MESSAGE = 'Не указана оценка фильма';

type PostCommentFormProps = {
  film: Film;
}

function PostCommentForm(props: PostCommentFormProps): JSX.Element {
  const history = useHistory();
  const {film} = props;

  const [userScore, setUserScore] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [isTextareaDisabled, setIsTextareaDisabled] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  function handleInputChange({target}: ChangeEvent<HTMLInputElement>) {
    setUserScore(Number(target.value));
    target.checked = true;
  };

  function handleTextAreaChange({target}: ChangeEvent<HTMLTextAreaElement>) {
    setUserReview(target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (userScore !== 0 && userReview.length >= 50 && userReview.length <= 400) {
      setIsTextareaDisabled(true);
      setIsSubmitButtonDisabled(true);
      api.post(`${APIRoute.Comments}/${film.id}`, {rating: userScore, comment: userReview})
      .then(() => {
        history.push(`/films/${props.film?.id}`);
      })
      .catch(() => {
        toast.error(POST_COMMENT_FAIL_MESSAGE);
        setIsTextareaDisabled(false);
        setIsSubmitButtonDisabled(false);
      })
    }
    else {
      if (userReview.length < 50) {
        toast.warn(FORM_MIN_LENGTH_FAIL_MESSAGE);
      }
      if (userReview.length > 400) {
        toast.warn(FORM_MAX_LENGTH_FAIL_MESSAGE);
      }
      if (userScore === 0) {
        toast.warn(FORM_EMPTY_SCORE_FAIL_MESSAGE);
      }
    }
  };

  useEffect(() => {
    if (userScore !== 0 && userReview.length >= 50 && userReview.length <= 400) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  }, [userScore, userReview]);

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <input onChange={handleInputChange} className="rating__input" id="star-10" type="radio" name="rating" value="10" />
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input onChange={handleInputChange} className="rating__input" id="star-9" type="radio" name="rating" value="9" />
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input onChange={handleInputChange} className="rating__input" id="star-8" type="radio" name="rating" value="8" />
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input onChange={handleInputChange} className="rating__input" id="star-7" type="radio" name="rating" value="7" />
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input onChange={handleInputChange} className="rating__input" id="star-6" type="radio" name="rating" value="6" />
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input onChange={handleInputChange} className="rating__input" id="star-5" type="radio" name="rating" value="5" />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input onChange={handleInputChange} className="rating__input" id="star-4" type="radio" name="rating" value="4" />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input onChange={handleInputChange} className="rating__input" id="star-3" type="radio" name="rating" value="3" />
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input onChange={handleInputChange} className="rating__input" id="star-2" type="radio" name="rating" value="2" />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input onChange={handleInputChange} className="rating__input" id="star-1" type="radio" name="rating" value="1" />
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea disabled={isTextareaDisabled} onChange={handleTextAreaChange} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isSubmitButtonDisabled}>Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default PostCommentForm;
