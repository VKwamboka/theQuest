import path from 'path'
import dotenv from 'dotenv'
import {v4 as uid} from 'uuid'
import { createQuizHelper, updateQuizHelper } from '../helpers/questionHelpers'
import { RequestHandler,Request,Response } from 'express'
import { DatabaseUtils } from "../utilis/dbUtilis";
import { Question } from '../interfaces/question'
import { DecodedData, User } from '../interfaces/userInterface'

interface ExtendedRequest extends Request{
    body:{Name:string,UserId:string, Email:string,Title:string,Body:string,Code:string,Tags:string[]},
    params:{id:string},
    info?:DecodedData
}

const  _db = new DatabaseUtils()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// create question

export const createQuestion = async (req: ExtendedRequest, res: Response) => {
    try{
        const { Title, Body, Code} = await createQuizHelper.validateAsync(req.body)
        
        const question: Question = {
            Title,
            Body,
            UserID: req.info!.userId,
            Code,
            QuestionDate: new Date(),
            questionID: uid(),
        }
        
        const userId = req.info?.userId

        console.log(userId)


        console.log(question)

        const user:User= await (await  _db.exec('usp_FindUserById', {userId})).recordset[0]
        console.log(req.params)
        if(!user){
       return res.status(404).json({error:'User Not Found'})
    }

        const result = await _db.exec("createQuestion", question)
        res.status(201).json(result)
        console.log(question)

    }catch (error) {
    return res.status(500).json(error)
  }
    
}


// get all questions
// export const getAllQuestions = async (req: Request, res: Response) => {
//     try {
//         const result = await (await _db.exec("GetAllQuestions")).recordset
//         res.status(200).json(result)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

// get all questions with pagination
export const getAllQuestions = async (req: ExtendedRequest, res: Response) => {
    interface IPagination{
        pageNumber: number,
        pageSize: number
    }
    const { pageNumber, pageSize } = req.query;
    const pagination: IPagination = {
        pageNumber: pageNumber? +pageNumber: 1,
        pageSize: pageSize? +pageSize: 15
    }
    try {
        // const pageNumber = parseInt(pagination.pageNumber) || 1; // default to first page
        // const pageSize = parseInt(pagination.pageSize) || 10; // default page size to 10
        const result = await (await _db.exec("GetAllQuestions", {pageNumber: pagination.pageNumber, pageSize: pagination.pageSize})).recordset;
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

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

// get full question by id
export const getFullQuestionById = async (req: ExtendedRequest, res: Response) => {
    try{
      const questionID = req.params.id
      console.log(req.params.id)
  
      const question:Question= await (await _db.exec('FetchFullQuestion', {questionID} )).recordset[0]
      if(question){
          await _db.exec("FetchFullQuestion", {questionID})
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
        const { Title, Body, Code} = await updateQuizHelper.validateAsync(req.body)

        const quiz:Question= await (await _db.exec('usp_FindQuestionById', {QuestionID} )).recordset[0]

        if(quiz){
            await _db.exec("UpdateQuestion", {QuestionID, Title:Title, Body:Body, Code:Code})

            return res.status(200).json({message:'Updated  Question Successfully'})

        }
        return res.status(404).json({error:'Oops! Question Not Found'}) 

    }catch (error) {
        res.status(500).json(error)
}
}

// get speific user questions
export const getUserQuestions = async (req: ExtendedRequest, res: Response) => {
    try{
        const UserID = req.info?.userId
        
        console.log(req.info?.userId)
        const quiz= await (await _db.exec('GetUserQuestions', {UserID} )).recordset

        if(quiz.length){
            
            await _db.exec("GetUserQuestions", {UserID})
            return res.status(200).json(quiz) 
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
            return res.status(200).json({message:'Question Deleted Successfully'}) 
        }

        return res.status(404).json({error:'Oops! Question Not Found'})  
     
    }catch (error) {
        res.status(500).json(error)
    }
}