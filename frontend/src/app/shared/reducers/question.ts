import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import  {Question} from '../../interfaces/question';
import {addQuestion, addQuestionSuccess,  getQuestions, getQuestionsSuccess, getQuestionFail,getsingleQuestionId,updateQuestionSuccess,updateQuestionFail,addQuestionFail,deleteQuestionFail,deleteQuestionSuccess, getsingleQuestionIdSuccess, getsingleQuestionIdFail, getUserQuestionsSuccess, deleteQuestion, deleteQuestionByUser} from '../actions/question';
import { addAnswer } from "src/app/user/actions/answer";
import {QuestionInterface} from '../states/question';
import { initialState } from "../states/question";
// import { OneQuestionInterface } from "../states/question";


const questionSliceState= createFeatureSelector<QuestionInterface>('question')
// const userQuestionSliceState = createFeatureSelector<QuestionInterface>('userquestion')
  
 export const oneQuestion = createSelector(questionSliceState, state=>state.oneQuestion)
  export const userQuestion = createSelector(questionSliceState, state=>state.userQuestions)  
export const myQuestions= createSelector(questionSliceState, state=>state.questions)
const myQuestionsId= createSelector(questionSliceState, state=>state.questionId)



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

    // get single question
    on(getUserQuestionsSuccess, (state, actions):QuestionInterface=>{
        return{
            ...state,
            userQuestions:actions.Questions
        }
    }),

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

        const  remainingQuestions = state.userQuestions.filter(item=>{
            return item.questionID!==state.QuestionDelete
        })
        return {
            ...state,
            deleteError:'',
            userQuestions:remainingQuestions,
            deleteSuccess:action.message.message
        }
     }),
     on(deleteQuestionFail,(state,action):QuestionInterface=>{
        return {
            ...state,
            deleteError:action.error,
            deleteSuccess:''
        }
     }),



    //  delete question
    on(deleteQuestionByUser,(state,action):QuestionInterface=>{
        return {
            ...state,
            QuestionDelete:action.id,
            deleteError:'',
            deleteSuccess:''
        }
    }),



    //  add answer
    on(addAnswer, (state, { answer }) => ({
        ...state,
        Answers: [...state.Answers, answer],
      }))
)

// export const answerReducer = createReducer(
//     initialState,
//     on(addAnswer, (state, { answer }) => ({
//       ...state,
//       Answers: [...state.Answers, answer],
//     }))
//   );