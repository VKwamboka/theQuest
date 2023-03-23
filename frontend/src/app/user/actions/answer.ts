import { createAction, props } from '@ngrx/store';
import { Answer } from 'src/app/interfaces/answer';
import { Vote } from 'src/app/interfaces/vote';

export const addAnswer = createAction(
  '[Question Page] Add Answer',
  props<{ answer: Answer }>()
);


export const ADD_COMMENT = '[Comment] Add Comment';

export const addComment = createAction(
  ADD_COMMENT,
  (payload: { comment: Comment, answerId: string }) => ({ payload })
);

export const ADD_VOTE = '[Vote] Add Vote';

export const addVote = createAction(
  ADD_VOTE,
  (payload: { answer_id:string, voteType:string}) => ({ payload })
)

export const MARK_PREFERRED ='[Answer] Mark Preferred';
export const markPreferred = createAction(
  MARK_PREFERRED,
  (payload: { answer_id:string, answer:Answer}) => ({ payload })
)
// get user id
export const GET_USER_ID = '[User] Get User Id';
export const getUserId = createAction(
  GET_USER_ID,
  (payload: { userId:string}) => ({ payload })
)