import path from 'path'
import dotenv from 'dotenv'
import {v4 as uid} from 'uuid'
import{createAnswerHelper, updateAnswerHelper} from '../helpers/answerHelper'
import { Request,Response } from 'express'
import { DatabaseUtils } from "../utilis/dbUtilis";
import { Answer } from '../interfaces/answer'
import { DecodedData, User } from '../interfaces/userInterface'
import { sendEmail } from '../utilis/background-services/helpers/email'

interface ExtendedRequest extends Request{
    body:{answer_id:string, user_id:string,question_id:string,created_at:Date,updated_at:Date,answer_text:string},
    params:{id:string},
    info?:DecodedData
}

const  _db = new DatabaseUtils()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// create answer
export const createAnswer = async (req: Request, res: Response) => {
    try{
        const { user_id,question_id,answer_text} = await createAnswerHelper.validateAsync(req.body)
        const answer: Answer = {
            answer_id: uid(),
            user_id: user_id,
            question_id: question_id,
            answer_text,
            created_at: new Date(),
            updated_at: new Date()
        }
        // const userId = req.params.userId
        // const user:User= await (await  _db.exec('usp_FindUserById', {userId})).recordset[0]
        // if(!user){
        //    return res.status(404).json({error:'User Not Found'})
        // }

        const result = await _db.exec("createAnswer", answer)
       return  res.status(201).json(result)

    }   
    catch (error) {
            return res.status(500).json(error)
          }
}

// get answers
export const getAnswers = async (req: Request, res: Response) => {
    try {
        const result = await (await _db.exec("GetAllAnswers")).recordset
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}


// update answer
export const updateAnswer = async (req: ExtendedRequest, res: Response) => {
    try {
        const {user_id,question_id,answer_text} = await updateAnswerHelper.validateAsync(req.body)

        const answer_id = req.params.id
        const answerID = req.params.id
     
        const answer:Answer= await (await _db.exec('findAnswerById', {answerID} )).recordset[0]
        console.log(answer)

        if(!answer){
            return res.status(404).json({message: "Answer not found"})
        }

        const result = await (await _db.exec("usp_UpdateAnswer", {answer_id,answer_text,user_id:user_id,question_id:question_id}))
        return res.status(200).json({message:'Updated  Answer Successfully'})

       
    } catch (error) {
        console.log(error)
       return res.status(500).json(error)
    }
}

// delete answer
export const deleteAnswer = async (req: ExtendedRequest, res: Response) => {
    try {
        const answerID = req.params.id
     
        const answer:Answer= await (await _db.exec('findAnswerById', {answerID} )).recordset[0]
        console.log(answer)

        if(!answer){
            return res.status(404).json({message: "Answer not found"})
        }

        const answer_id = req.params.id
        const {user_id}= req.body
         await _db.exec("DeleteAnswerByUser", {answer_id,user_id:user_id})

        res.status(200).json({message: "Answer deleted successfully"})
    } catch (error) {
        return res.status(500).json({error:"You cannot delete an answer you did not post"})
    }
}


// get answer by id
export const getAnswerById = async (req: ExtendedRequest, res: Response) => {
    try {
        const answerID = req.params.id
        console.log(req.params)
        const result = await (await _db.exec("findAnswerById", {answerID})).recordset[0]

        if(result){
            return res.status(200).json(result)
        }
        return res.status(404).json({error:'Oops! Answer Not Found'}) 
        
    } catch (error) {
       return res.status(500).json(error)
    }
}


// mark answer as preferred
export const markAnswerPreferred = async (req: ExtendedRequest, res: Response) => {
    try{
        // const answer:Answer= await (await _db.exec('findAnswerById', {answerID} )).recordset[0]
        // console.log(answer)

        // if(!answer){
        //     return res.status(404).json({message: "Answer not found"})
        // }

        const { user_id, answer_id,question_id } = req.body; 

        const result = await (await _db.exec("MarkAnswerAsPreferred", {answer_id,user_id})).recordset[0]

        // Retrieve preferred answer user details
        const userDetails = await (await _db.exec("getPreferredAnswerUserDetails", { question_id:question_id })).recordset[0];

         //send email to user whose answer was marked as preferred
        const subject = "Your answer has been marked as preferred";
        const html = `<h1>Answer marked as preferred</h1>
        <p>Dear ${userDetails.Name},</p>
        <b>Congratulations!</b> Your answer has been marked as preferred.</p>
        <p>Regards,<br/>The OverFlow</p>
        <P>Happy Coding 🎉</P>`;
      
        sendEmail(subject, userDetails.Email, html);

        console.log(userDetails.Email)
            
     
        return res.status(200).json(result)  

    }catch (error) {
        return res.status(500).json(error)
        
    }
}


