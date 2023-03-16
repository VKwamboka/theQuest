import path from 'path'
import dotenv from 'dotenv'
import {v4 as uid} from 'uuid'
import{createAnswerHelper, updateAnswerHelper} from '../helpers/answerHelper'
import { RequestHandler,Request,Response } from 'express'
import { DatabaseUtils } from "../utilis/dbUtilis";
import { Question } from '../interfaces/question'
import { DecodedData } from '../interfaces/userInterface'
// import { createAnswerHelper } from '../helpers/answerHelper'

interface ExtendedRequest extends Request{
    body:{Name:string,userId:string, Email:string,Title:string,Body:string,Code:string,Tags:string[]},
    params:{id:string},
    info?:DecodedData
}

const  _db = new DatabaseUtils()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// create answer

export const createAnswer = async (req: Request, res: Response) => {
    try{
        const { Title, Body, Code, UserId} = await createAnswerHelper.validateAsync(req.body)
        
        const question: Question = {
            Title,
            Body,
            UserID:UserId,
            Code,
            QuestionDate: new Date(),
            questionID: uid(),
        }

        console.log(question)

        const result = await _db.exec("createQuestion", question)
        res.status(201).json(result)
        console.log(question)

    }catch (error) {
    return res.status(500).json(error)
  }
    
}


// get all questions
export const getAllQuestions = async (req: Request, res: Response) => {
    try {
        const result = await _db.exec("GetAllQuestions")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get question by id(get one question)
export const getQuestionById = async (req: ExtendedRequest, res: Response) => {
  try{
    const questionID = req.params.id
    console.log(req.params.id)

    const question:Question= await (await _db.exec('usp_FindQuestionById', {questionID} )).recordset[0]
    if(question){
        await _db.exec("usp_FindQuestionById", {questionID})
        return res.status(200).json(question)
        
    }
    return res.status(404).json({error:'Oops! Question Not Found'}) 

  }catch (error) {
    console.log(error)
    res.status(500).json(error)
}
}

// update question

export const updateQuestion = async (req: ExtendedRequest, res: Response) => {
    try{
        const QuestionID = req.params.id
        const { Title, Body, Code} = await updateAnswerHelper.validateAsync(req.body)

        const quiz:Question= await (await _db.exec('usp_FindQuestionById', {QuestionID} )).recordset[0]

        if(quiz){
            console.log(quiz.questionID === QuestionID)

            
            await _db.exec("UpdateQuestion", {QuestionID, Title:Title, Body:Body, Code:Code})

            return res.status(200).json({message:'Updated  Question Successfully'})

        }
        return res.status(404).json({error:'Oops! Question Not Found'}) 

    }catch (error) {
        res.status(500).json(error)
}
}


// delete question

export const deleteQuestion = async (req: ExtendedRequest, res: Response) => {
    try{
        const QuestionID = req.params.id

        const quiz:Question= await (await _db.exec('usp_FindQuestionById', {QuestionID} )).recordset[0]

        if(quiz){
            await _db.exec("DeleteQuestion", {QuestionID})
            return res.status(200).json({error:'Question Deleted Successfully'}) 
        }

        return res.status(404).json({error:'Oops! Question Not Found'})  
        // const result = await _db.exec("DeleteQuestion", {QuestionID})
        // res.status(200).json(result)
    }catch (error) {
        res.status(500).json(error)
    }
}