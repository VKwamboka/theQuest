import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import  {Question} from '../../interfaces/question';
import {addQuestion, addQuestionSuccess,  getQuestions, getQuestionsSuccess, getQuestionFail,getsingleQuestionId,updateQuestionSuccess,updateQuestionFail,addQuestionFail,deleteQuestionFail,deleteQuestionSuccess, getsingleQuestionIdSuccess, getsingleQuestionIdFail} from '../actions/question';

import {QuestionInterface} from '../states/question';
import { initialState } from "../states/question";
// import { OneQuestionInterface } from "../states/question";


const questionSliceState= createFeatureSelector<QuestionInterface>('question')

// const OnequestionSliceState = createFeatureSelector<OneQuestionInterface>('oquestion')
 
 export const oneQuestion = createSelector(questionSliceState, state=>state.oneQuestion)

export const myQuestions= createSelector(questionSliceState, state=>state.questions)
const myQuestionsId= createSelector(questionSliceState, state=>state.questionId)

// get single question
// export const getSingleQuestion=createSelector(myQuestions,myQuestionsId,(state,id)=>{

//     return state.find(x=>x.questionID===id)
// })

export const questionReducer=createReducer<QuestionInterface>(
    initialState,
    // get all questions
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


    //  getting single question
    //  on(getsingleQuestionId,(state,actions):OneQuestionInterface =>{
    //     return{
    //         ...state,
    //         questionId:actions.id
    //     }
    //  }),


    on(getsingleQuestionIdSuccess,(state,actions):QuestionInterface=>{
        return{
           ...state,
            oneQuestion:actions.Question
        }
    }),
    
    
    on(getsingleQuestionIdFail,(state,actions):QuestionInterface=>{
        return{
            ...state,
            error:actions.error
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