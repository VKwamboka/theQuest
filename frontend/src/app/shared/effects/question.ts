
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";
import { QuestionService } from "../services/question.service";
import * as QuestionActions from '../actions/question'


@Injectable()
export class QuestionEffects{
    constructor(private quetionService:QuestionService,private actions$:Actions ){}

    // get questions
    allQuestions = createEffect(()=>{
        return this.actions$.pipe(
            ofType(QuestionActions.getQuestions),
            mergeMap(()=>{
               return this.quetionService.getAllQuestions().pipe(
                    map(questions=>{
                        console.log(questions)
                        // error
                        return QuestionActions.getQuestionsSuccess({Questions:questions})
                    }),
                    catchError(error=>of(QuestionActions.getQuestionFail({error:error.message})))
                )
            })
        )
    })



// add Question
    addQuestion = createEffect(()=>{
        return this.actions$.pipe(
            ofType(QuestionActions.addQuestion),
            concatMap((action)=>{
                return this.quetionService.addQuestion(action.newQuestion).pipe(
                    map(message=>{
                        return QuestionActions.addQuestionSuccess({message:message})
                    }),
                    catchError(error=>of(QuestionActions.addQuestionFail({error:error.message})))
                )
            })
        )
    })


    // update question
    updateQuestion = createEffect(()=>{
        return this.actions$.pipe(
            ofType(QuestionActions.updateQuestion),
            concatMap((action)=>{
                return this.quetionService.updateQuestion(action.id,action.updatedQuestion).pipe(
                    map(sucessResponse=>{
                        return QuestionActions.updateQuestionSuccess({Question:sucessResponse})
                    }),
                    catchError(error=>of(QuestionActions.updateQuestionFail({error:error.message})))
                )
            })
        )
    })

    // delete question
    deleteQuestion = createEffect(()=>{
        return this.actions$.pipe(
            ofType(QuestionActions.deleteQuestion),
            concatMap((action)=>{
                return this.quetionService.deleteQuestion(action.id).pipe(
                    map(message=>{
                        return QuestionActions.deleteQuestionSuccess({message:message})
                    }),
                    catchError(error=>of(QuestionActions.deleteQuestionFail({error:error.message})))
                )
            })
        )
    })


    // get single question
    // getSingleQuestion = createEffect(()=>{
    //     return this.actions$.pipe(
    //         ofType(QuestionActions.getsingleQuestionId),
    //         concatMap((action)=>{
    //             return of(action.id)
    //         })
    //     )
    // })

}