import { AuthState } from "./authState";
import { QuestionInterface } from "src/app/shared/states/question";


export interface AppState{
    question:QuestionInterface,
    auth:AuthState
}