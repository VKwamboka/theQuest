import path from 'path'
import dotenv from 'dotenv'
import {v4 as uid} from 'uuid'
import { createQuizHelper, updateQuizHelper } from '../helpers/questionHelpers'
import { RequestHandler,Request,Response } from 'express'
import { DatabaseUtils } from "../utilis/dbUtilis";
import { Question } from '../interfaces/question'
import { DecodedData } from '../interfaces/userInterface'

interface ExtendedRequest extends Request{
    body:{Name:string,userId:string, Email:string,Title:string,Body:string,Code:string,Tags:string[]},
    params:{id:string},
    info?:DecodedData
}

const  _db = new DatabaseUtils()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const createQuestion = async (req: Request, res: Response) => {
    try{
        const { Title, Body, Code, UserId} = await createQuizHelper.validateAsync(req.body)
        
        const question: Question = {
            Title,
            Body,
            UserID:UserId,
            Code,
            QuestionDate: new Date(),
            questionID: "fghvgfdhghdjfgsdhghjeg"
        }

        console.log(question)

        const result = await _db.exec("createQuestion", question)
        res.status(201).json(result)
        console.log(question)

    }catch (error) {
    return res.status(500).json(error)
  }
    
}
// create question

// export const createQuiz = async (req: Request, res: Response) => {
//     const { error } = createQuizHelper.validate(req.body);
//     if (error) {
//       return res.status(422).json(error.details[0].message);
//     }
  
//     const {
//       UserId,
//       Title,
//       Body,
//       Code,
//       QuestionDate,
    
      
//     } = req.body;
  
//     try {
//       const question = await _db.exec("createQuestion", {
//         UserId,
//         Title,
//         Body,
//         Code,
//         QuestionDate,
//         questionID: uid(),
//       });
//       console.log(req.body)
  
//       if (question.recordset.length > 0) {
//         return res.status(201).json(question.recordset[0]);
//       } else {
//         return res.status(400).json({ message: "Question not created" });
//       }
//     } catch (error: any) {
//       res.status(500).json(error.message);
//       console.log(error);
//     }
//   };


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
    console.log(questionID)

    const result = await _db.exec("GetQuestionById", {questionID})
    res.status(200).json(result)
  }catch (error) {
    res.status(500).json(error)
}
}