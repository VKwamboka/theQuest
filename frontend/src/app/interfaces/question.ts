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
}

export interface Message{
    message:string
}