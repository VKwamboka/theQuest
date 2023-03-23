import path from "path";
import dotenv from "dotenv";
import { v4 as uid } from "uuid";
import {
  createCommentHelper,
  updateCommentHelper,
} from "../helpers/commentHelpers";
import { Request, Response } from "express";
import { DatabaseUtils } from "../utilis/dbUtilis";
import { Comment } from "../interfaces/comment";
import { DecodedData, User } from "../interfaces/userInterface";

interface ExtendedRequest extends Request {
  body: {
    answer_id: string;
    user_id: string;
    comment_id: string;
    comment_text: string;
  };
  params: { id: string };
  info?: DecodedData;
}

const _db = new DatabaseUtils();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// create comment
export const createComment = async (req: ExtendedRequest, res: Response) => {
  try {
    const { user_id, answer_id, comment_text } =
      await createCommentHelper.validateAsync(req.body);

    const comment: Comment = {
      comment_id: uid(),
      user_id: req.info!.userId,
      answer_id: answer_id,
      comment_text,
    };
    const result = await _db.exec("CreateAnswerComment", comment);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// update comment
export const updateComment = async (req: ExtendedRequest, res: Response) => {
  try {
    const { user_id, answer_id, comment_text } =
      await updateCommentHelper.validateAsync(req.body);

    const comment: Comment = {
      comment_id: req.params.id,
      user_id: user_id,
      answer_id: answer_id,
      comment_text,
    };
    const result = await _db.exec("UpdateAnswerComment", comment);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get all comments
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const result = await (await _db.exec("GetAllComments")).recordset;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// delete comment
export const deleteComment = async (req: ExtendedRequest, res: Response) => {
  try {
 const comment_id = req.params.id
 console.log(comment_id)

 const comment = await  (await _db.exec("findCommentById", {comment_id})).recordset[0]
    if(comment){
    await _db.exec("DeleteAnswerComment", {comment_id: req.params.id, user_id:req.body.user_id});
          return res.status(200).json({message:'Deleted Comment Successfully'})
    }
   
        return res.status(404).json({message:'Comment Not Found'})
    
    
  } catch (error) {
    return res.status(500).json({error:"You cannot delete a comment you did not post"})
  }
};

// get comment by id
export const getCommentById = async (req: ExtendedRequest, res: Response) => {
  try {


    const result = await (await _db.exec("findCommentById", {
      comment_id: req.params.id,
    })).recordset[0];
    if(result){
            return res.status(200).json(result);

    }
    return res.status(404).json({error:'Oops! Comment Not Found'})  

  } catch (error) {
    return res.status(500).json(error);
  }
};
