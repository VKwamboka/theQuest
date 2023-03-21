import { Answer } from "./answer";
import { Votes } from "./votes";

export interface Question{
    questionID: string,
    Title: string,
    Body : string,
    Code:string,
    UserID: string,
    QuestionDate: Date,
}

export interface FullQuestion{
    questionID: string,
    Title: string,
    Body : string,
    Code:string,
    UserID: string,
    QuestionDate: Date,
    Name:string,
    Answers:Answer[]
    Votes:Votes[]
}