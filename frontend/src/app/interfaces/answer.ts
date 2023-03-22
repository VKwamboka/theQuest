import { Vote } from "./vote";
import { Comment } from "./comment";

export interface Answer {
    answer_id: string;
    user_id: string;
    UserName: string;
    answer_text: string;
    isPreffered: boolean;
    AnswerDate: Date;
    Votes: Vote[];
    Comments: Comment[];
  }