import { AuthState, UsersState } from "./authState";
import { QuestionInterface } from "src/app/shared/states/question";
// import { OneQuestionInterface } from "src/app/shared/states/question";

export interface AppState{
    question:QuestionInterface,
    auth:AuthState
    users:UsersState 
    // fullQuestion:OneQuestionInterface
}