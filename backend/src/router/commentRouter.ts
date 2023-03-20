import express from "express";
import { createComment, updateComment, getAllComments,getCommentById,deleteComment } from "../controllers/comment";
import { VerifyToken } from "../middleware/verifyToken";

const commentRouter = express.Router();

// Comment routes
commentRouter.post("/post-comment",VerifyToken, createComment);
commentRouter.put("/update-comment/:id", VerifyToken,updateComment);
commentRouter.get("/getAllComments", VerifyToken,getAllComments);
commentRouter.get("/getCommentById/:id",VerifyToken, getCommentById);
commentRouter.delete("/deleteComment/:id", VerifyToken,deleteComment);

export default commentRouter;
