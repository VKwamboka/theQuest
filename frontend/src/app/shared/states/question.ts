import { FullQuestion, Question } from "src/app/interfaces/question"

export interface QuestionInterface{
    questions:Question[] 
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
        questions:[],
        questionId:'',
        error:'',
        addSuccess:'',
        addError:'',
        updateError:'',
        deleteSuccess:'',
        deleteError:'',
    }