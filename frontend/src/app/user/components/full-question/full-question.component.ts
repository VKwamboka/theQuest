import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HighlightCodeDirective } from 'src/app/user/templates/highlight-code.directive';
import { QuestionService } from 'src/app/shared/services/question.service';
import { iif, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AppState } from 'src/app/core/states/appState';
import { FullQuestion, Question } from 'src/app/interfaces/question';
import { getsingleQuestionId } from 'src/app/shared/actions/question';
import { oneQuestion } from 'src/app/shared/reducers/question';
import {Answer} from 'src/app/interfaces/answer'
import { Vote } from 'src/app/interfaces/vote';
import { Comment } from 'src/app/interfaces/comment';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { addAnswer, addVote, getUserId } from '../../actions/answer';
import { quizService } from '../../services/user-quiz.service';
import {usersSliceState,userId, allusers} from 'src/app/core/reducers/authReducers'
import { addComment } from '../../actions/answer';
import { profile } from 'src/app/core/states/authState';



@Component({
  selector: 'app-full-question',
  standalone: true,
  imports: [CommonModule, HighlightCodeDirective,RouterModule,ReactiveFormsModule],
  templateUrl: './full-question.component.html',
  styleUrls: ['./full-question.component.css'],
  // hostDirectives: [HighlightCodeDirective]

})
export class FullQuestionComponent {
  question!: FullQuestion
  id!:string
  logged!:string
  answers!:Answer[]
  votes!:Vote[]
  comments!:Comment[]
  commentForm!: FormGroup;
  answerForm!:FormGroup;
  answerText?: string;
  userId!:string
  shqQuiz=false;
  shAnsw = false;
  answerst: Answer[] = [];
 answer_id = ''
 isAnswerPreferred = false;

  constructor(private route:ActivatedRoute, private router:Router , private quizService:quizService,private fb:FormBuilder,private store:Store<AppState>){}
  

  ShowQuestion(){
    this.shqQuiz=!this.shqQuiz
  }

  showAnsw(){
    this.shAnsw=!this.shAnsw
  }
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id']
      this.store.dispatch(getsingleQuestionId({id:params['id']}))
    })
  

this.store.select(oneQuestion).subscribe((question)=>{
  if(question){
    this.question=question
  
    this.answers=JSON.parse(question.Answers) 
    if(this.answers){
      for (let answer of this.answers) {
        if (answer.isPreffered) {
          this.isAnswerPreferred = true;
          break;
        }
        
      }
    }
    
    
    console.log(question.UserID);
    // console.log(this.comments)
    
  }
})



this.store.dispatch(getsingleQuestionId({id:this.id}))

  this.store.select(profile).subscribe((user)=>{
    if(user){
      this.userId=user.userId
      console.log(this.userId)
    }
  })

  this.quizService.getUserId().subscribe((res)=>{
    // this.store.dispatch(getUserId({userId:res}))
    this.userId=res
    console.log(this.userId)
    
  })
   
  //  this.quizService.getOneQuestion(this.id).subscribe((res)=>{
   
  //   this.userId = res.UserID
  //   console.log(res.UserID)
  //  }) 
  
  
 
  
  // add answer
this.answerForm=this.fb.group({
  answer_text:[null]
})

// add comment form
this.commentForm=this.fb.group({
  comment_text:[null]
})



 
  // mark answer as preferred
 





}

// answer:Answer = this.commentForm.value;
addAnswers(){
  // this.store.dispatch(addAnswer({answer:this.answer,questionId:this.id}))
  this.quizService.addAnswer({...this.answerForm.value,question_id:this.id}).subscribe((res)=>{
    console.log(res)
    this.store.dispatch(addAnswer({ ...this.answerForm.value,question_id:this.id }));

  })
  this.store.dispatch(addAnswer({ ...this.answerForm.value,question_id:this.id }));
  this.store.dispatch(getsingleQuestionId({id:this.id}))
  this.answerForm.reset()
  // this.router.navigate(['/user/all-questions'])
} 


// get answer id

addComments(answerId: string){
  this.quizService.addComment({...this.commentForm.value,answer_id:answerId}).subscribe((res)=>{
    console.log(res)
    this.store.dispatch(addComment({ ...this.commentForm.value,answer_id:answerId }));

  })
  this.store.dispatch(addComment({ ...this.commentForm.value,answer_id:answerId}));
  this.store.dispatch(getsingleQuestionId({id:this.id}))
  this.commentForm.reset()
}



// add vote
addVote(answer_id: string, voteType: 'upvote' | 'downvote') {
  this.quizService.addVote({ answer_id:answer_id, vote_type: voteType }).subscribe((res) => {
  
    this.store.dispatch(getsingleQuestionId({ id: this.id }));
  });
  this.store.dispatch(addVote({answer_id:answer_id, voteType}));
  this.store.dispatch(getsingleQuestionId({id:this.id}))
}

// mark answer as preferred
markAsPreferred(answer_id: string) {
  this.quizService.markPreferred(answer_id).subscribe((res) => {
    // console.log(res);
    this.store.dispatch(getsingleQuestionId({ id: this.id }));
  });
  // this.store.dispatch(getsingleQuestionId({ id: this.id }));
}

getUpvoteCount(answer: any): number {
  return answer?.Votes?.filter((v: any) => v.vote_type === 'upvote').length || 0;
}

getDownvoteCount(answer: any): number {
  return answer?.Votes?.filter((v: any)=> v.vote_type === 'downvote').length || 0;
}

// get user id


}
