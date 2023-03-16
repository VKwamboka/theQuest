import path from 'path'
import dotenv from 'dotenv'
import {v4 as uid} from 'uuid'
import { createCommentHelper,updateCommentHelper } from '../helpers/commentHelpers'
import { Request,Response } from 'express'
import { DatabaseUtils } from "../utilis/dbUtilis";
import { Answer } from '../interfaces/answer'
import { DecodedData, User } from '../interfaces/userInterface'


interface ExtendedRequest extends Request{
    body:{answer_id:string, user_id:string,question_id:string,created_at:Date,updated_at:Date,answer_text:string},
    params:{id:string},
    info?:DecodedData
}


const  _db = new DatabaseUtils()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// create comment

