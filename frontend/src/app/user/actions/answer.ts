import { createAction, props } from '@ngrx/store';
import { Answer } from 'src/app/interfaces/answer';

export const addAnswer = createAction(
  '[Question Page] Add Answer',
  props<{ answer: Answer }>()
);


export const ADD_COMMENT = '[Comment] Add Comment';

export const addComment = createAction(
  ADD_COMMENT,
  (payload: { comment: Comment, answerId: string }) => ({ payload })
);
