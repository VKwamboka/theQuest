import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import {v4 as uid} from 'uuid'
import { RequestHandler,Request,Response } from 'express'
import { DecodedData, User } from '../interfaces/userInterface'
import { DatabaseUtils } from "../utilis/dbUtilis";
import { Votes } from '../interfaces/votes'
import { createVoteHelper, updateVoteHelper } from '../helpers/voteHelper'

dotenv.config({path:path.join(__dirname,'../../.env')})

const  _db = new DatabaseUtils()
interface ExtendedRequest extends Request{
    body:{user_id:string, answer_id:string, vote_type:string, vote_id:string},
    params:{id:string},
    info?:DecodedData
}

// post vote
export const createVote = async (req: ExtendedRequest, res: Response) => {
    try {
      const { user_id, answer_id, vote_type } = await createVoteHelper.validateAsync(req.body);
  
      const vote:Votes = {
                    vote_id: uid(),
                    user_id:user_id,
                    answer_id:answer_id,
                    vote_type,
                };
// find if answer and user exist
      const answerID = answer_id
      const userId = user_id
      const answer = await (await _db.exec('findAnswerById', {answerID})).recordset[0]
      const user = await (await _db.exec('usp_FindUserById', {userId})).recordset[0]
      console.log(answer)
      if(answer  && user){
        await (await _db.exec('vote_answer', vote )).recordset
        return res.status(201).json({message:"Voted succcessfully!!!"});
      }
      return res.status(404).json({message:"Answer or User not found"})
     

      
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  };


// update vote
export const updateVote = async (req: ExtendedRequest, res: Response) => {
    try{
        const {user_id,  vote_type} = await updateVoteHelper.validateAsync(req.body)
        const answer_id= req.params.id

        const result = await _db.exec("updateVote", {user_id, answer_id, vote_type})
        return res.status(200).json({message:'Updated  Vote Successfully'})

    }catch (error) {
        return res.status(500).json(error)
      }
}


// get all votes
export const getAllVotes = async (req: ExtendedRequest, res: Response) => {
    try{
        const result = await (await _db.exec("getAllVotes")).recordset
        return res.status(200).json(result)

    }catch (error) {
        return res.status(500).json(error)
      }
}


// delete votes
export const deleteVote = async (req: ExtendedRequest, res: Response) => {
    try{
       await _db.exec("deleteVote", {id: req.params.id})
        return res.status(200).json({message:'Deleted  Vote Successfully'})

    }catch (error) {
        return res.status(500).json(error)
      }
}

// get vote by id
export const getVoteById = async (req: ExtendedRequest, res: Response) => {
    try{
      const vote_id = req.params.id
       
      const result = await (await _db.exec("findVoteById", {vote_id})).recordset[0]
        if(result){
          return res.status(200).json(result)
        }
        return res.status(404).json({error:"Vote not found"})

    }catch (error) {
        return res.status(500).json(error)
      }
}


// create vote
// export const createVote = async (req: ExtendedRequest, res: Response) => {
//     try{
//         const {user_id, answer_id, vote_type} = await createVoteHelper.validateAsync(req.body)
//         const vote:Votes = {
//             vote_id: uid(),
//             user_id: user_id,
//             answer_id: answer_id,
//             vote_type
//         }

//         const result = await _db.exec("createVote", vote)
//         return res.status(201).json(result)
        

//     }catch (error) {
//         return res.status(500).json(error)
//       }
// }
// }

// create vote
// export const createVote = async (req: ExtendedRequest, res: Response) => {
//     try {
//         const { user_id, answer_id, vote_type } = await createVoteHelper.validateAsync(req.body);
//         const vote:Votes = {
//             vote_id: uid(),
//             user_id,
//             answer_id,
//             vote_type,
//         };

//         // Check if voter has already voted
//         const existingVote = await (await _db.exec('getVoteByUserAndAnswer', { user_id, answer_id })).recordset;
//         if (existingVote && existingVote.length > 0) {
//             return res.status(400).json({ error: 'User has already voted on this answer.' });
//         }

//         // Insert vote into database
//         const result = await _db.exec('createVote', vote);
//         return res.status(201).json(result);
//     } catch (error) {
//         return res.status(500).json({ error});
//     }
// };