export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  FavoriteFilm = '/favorite',
  Comments = '/comments',
}

export enum TabsName {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export enum UserInformation {
  AuthFailMessage = 'Не забудьте авторизоваться',
  ServerFailMessage = 'Сервер не доступен',
  PostCommentFailMessage = 'Сервер не доступен',
  FormMinLengthFailMessage = 'Минимальная длина отзыва 50 символов',
  FormMaxLengthFailMessage = 'Максимальная длина отзыва 400 символов',
  FormEmptyScoreFailMessage = 'Не указана оценка фильма',

}

export const FILMS_COUNT_PER_STEP = 8;
