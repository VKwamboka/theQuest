import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import  {Question} from '../../interfaces/question';
import {addQuestion, addQuestionSuccess,  getQuestions, getQuestionsSuccess, getQuestionFail,getsingleQuestionId,updateQuestionSuccess,updateQuestionFail,addQuestionFail,deleteQuestionFail,deleteQuestionSuccess} from '../actions/question';

import {QuestionInterface} from '../states/question';
import { initialState } from "../states/question";


const questionSliceState= createFeatureSelector<QuestionInterface>('question')

export const myQuestions= createSelector(questionSliceState, state=>state.questions)
const myQuestionsId= createSelector(questionSliceState, state=>state.questionId)

// get single question
export const getSingleQuestion=createSelector(myQuestions,myQuestionsId,(state,id)=>{
    return state.find(x=>x.questionID===id)
})

export const questionReducer=createReducer<QuestionInterface>(
    initialState,
    on(getQuestionsSuccess, (state,actions):QuestionInterface=>{
       return {
        ...state,
        error:'',
        questions:actions.Questions
       } 
    })
    ,  on(getQuestionFail, (state,actions):QuestionInterface=>{
        return {
         ...state,
         questions:[],
        error:actions.error
        } 
     }),
     on(getsingleQuestionId,(state,actions):QuestionInterface=>{
        return{
            ...state,
            questionId:actions.id
        }
     }),

    //  add question
     on(addQuestionSuccess,(state,actions):QuestionInterface=>{
        return{
            ...state,
            addError:'',
            addSuccess:actions.message.message
        }
     }),
     on(addQuestionFail,(state,actions):QuestionInterface=>{
        return{
            ...state,
            addError:actions.error,
            addSuccess:''
        }
     }),

    //  update question
     on(updateQuestionSuccess,(state,action):QuestionInterface=>{

        const updatedQuestion=state.questions.map(item=>{
            return item.questionID===action.Question.questionID?action.Question:item
        })

        return{
            ...state,
            updateError:'',
            questions:updatedQuestion
        }
     }),
     on(updateQuestionFail,(state,action):QuestionInterface=>{
        return{
            ...state,
            updateError:action.error
        }
     }),

    //  delete question
     on(deleteQuestionSuccess,(state,action):QuestionInterface=>{
        return {
            ...state,
            deleteError:'',
            deleteSuccess:action.message.message
        }
     }),
     on(deleteQuestionFail,(state,action):QuestionInterface=>{
        return {
            ...state,
            deleteError:action.error,
            deleteSuccess:''
        }
     })
)