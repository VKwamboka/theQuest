import { Answer } from "src/app/interfaces/answer"
import { FullQuestion, Question } from "src/app/interfaces/question"

export interface QuestionInterface{
    questions:Question[] 
    Answers:Answer[]
    userQuestions:Question[]
    oneQuestion:FullQuestion |null
    questionId:string
    error:string
    addSuccess:string
    addError:string
    updateError:string
    deleteSuccess:string
    deleteError:string
}
    // export interface OneQuestionInterface{
    //     question:FullQuestion
    //     questionId:string
    //     error:string
    //     addSuccess:string
    //     addError:string
    //     updateError:string
    //     deleteSuccess:string
    //     deleteError:string
    // }

    


    
   export const initialState:QuestionInterface={
        oneQuestion:null,
        Answers:[],
        userQuestions:[],
        questions:[],
        questionId:'',
        error:'',
        addSuccess:'',
        addError:'',
        updateError:'',
        deleteSuccess:'',
        deleteError:'',
    }