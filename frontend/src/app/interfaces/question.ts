import { Answer } from "./answer"

export interface AddQuestion{
    Title: string,
    Body : string,
    Code?:string,
}

export interface Question{
    questionID: string,
    Title: string,
    Body : string,
    Code:string,
    UserID: string,
    QuestionDate: Date,
    Answers:Answer[]
}


export interface FullQuestion{
    questionID: string,
    Title: string,
    Body : string,
    Code:string,
    UserID: string,
    QuestionDate: Date,
    Answers:any
}
export interface Message{
    message:string
}