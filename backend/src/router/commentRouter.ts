import express from "express";
import { createComment, updateComment, getAllComments,getCommentById,deleteComment } from "../controllers/comment";

const commentRouter = express.Router();

// Comment routes
commentRouter.post("/post-comment", createComment);
commentRouter.put("/update-comment/:id", updateComment);
commentRouter.get("/getAllComments", getAllComments);
commentRouter.get("/getCommentById/:id", getCommentById);
commentRouter.delete("/deleteComment/:id", deleteComment);

export default commentRouter;
