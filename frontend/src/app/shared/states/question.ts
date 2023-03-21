import { Question } from "src/app/interfaces/question"

export interface QuestionInterface{
    questions:Question[]
    questionId:string
    error:string
    addSuccess:string
    addError:string
    updateError:string
    deleteSuccess:string
    deleteError:string
    }
    
   export const initialState:QuestionInterface={
        questions:[],
        questionId:'',
        error:'',
        addSuccess:'',
        addError:'',
        updateError:'',
        deleteSuccess:'',
        deleteError:'',
    }