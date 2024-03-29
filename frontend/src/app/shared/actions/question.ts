import { createAction, props } from "@ngrx/store";
import { AddQuestion, Question, Message, FullQuestion } from "src/app/interfaces/question";


export const getQuestions = createAction('[Question]-getQuestions')

export const getQuestionsSuccess = createAction('[Question]-getQuestionsSuccess', props<{Questions:Question[]}>())

export const getQuestionFail= createAction('[Question]-getQuestionFail',props<{error:string}>())

export const getsingleQuestionId= createAction('[Single-Question]-getSingleQuestionId',props<{id:string}>())

export const getsingleQuestionIdSuccess= createAction('[Single-Question]-getSingleQuestionIdSuccess',props<{Question:FullQuestion}>())

export const getsingleQuestionIdFail= createAction('[Single-Question]-getSingleQuestionIdFail',props<{error:string}>())


export const addQuestion = createAction('[addQuestion]-addQuestion',props<{newQuestion:AddQuestion}>())

export const addQuestionSuccess = createAction('[addQuestion]-addQuestionSuccess', props<{message:Message}>())

export const addQuestionFail= createAction('[addQuestion]-addQuestionFail',props<{error:string}>())



export const updateQuestion = createAction('[updateQuestion]-updateQuestion',props<{updatedQuestion:AddQuestion, id:string}>())

export const updateQuestionSuccess = createAction('[updateQuestion]-updateQuestionSuccess', props<{Question:Question}>())

export const updateQuestionFail= createAction('[updateQuestion]-updateQuestionFail',props<{error:string}>())



export const deleteQuestion = createAction('[deleteQuestion]-deleteQuestion',props<{id:string}>())
export const deleteQuestionByUser = createAction('[deleteQuestion]-deleteQuestion',props<{id:string}>())

export const deleteQuestionSuccess = createAction('[deleteQuestion]-deleteQuestionSuccess', props<{message:Message}>())

export const deleteQuestionFail= createAction('[deleteQuestion]-deleteQuestionFail',props<{error:string}>())


// get users questions
export const getUserQuestions = createAction('[getUserQuestions]-getUserQuestions')
export const getUserQuestionsFail= createAction('[getUserQuestions]-getUserQuestionsFail',props<{error:string}>())
export const getUserQuestionsSuccess = createAction('[getUserQuestions]-getUserQuestionsSuccess', props<{Questions:Question[]}>())
