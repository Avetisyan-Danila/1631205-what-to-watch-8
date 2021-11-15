import { AnyObject } from 'immer/dist/internal';
import {AuthorizationStatus} from './const';
import {Film} from './types/film';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const adapter = (data: AnyObject): Film => {
  return {
    id: data.id,
    posterImage: data.poster_image,
    previewVideoLink: data.preview_video_link,
    runTime: data.run_time,
    title: data.name,
    genre: data.genre,
    year: data.released,
    rating: data.rating,
    scoresCount: data.scores_count,
    description: data.description,
    director: data.director,
    starring: data.starring,
  };
};