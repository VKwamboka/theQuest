import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HighlightCodeDirective } from 'src/templates/highlight-code.directive';
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
import { addAnswer } from '../../actions/answer';
import { quizService } from '../../services/user-quiz.service';
import {usersSliceState} from 'src/app/core/reducers/authReducers'
import { addComment } from '../../actions/answer';
// import { oneQuestion} from 'src/app/shared/reducers/question';
// import {Quest}
// import { getSingleQuestion } from 'src/app/shared/reducers/question';

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
  answers!:Answer[]
  votes!:Vote[]
  comments!:Comment[]
  commentForm!: FormGroup;
  answerForm!:FormGroup;
  answerText?: string;
  userId:string=''
  shqQuiz=false;
  shAnsw = false;
  answerst: Answer[] = [];
 answer_id = ''

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

   
let answer;
for (let i = 0; i < this.answers.length; i++) {
  if (this.answers[i].answer_id === this.answer_id) {
    answer = this.answers[i];
    // break;
  }
}

    
    console.log(this.question);
    // console.log(this.comments)
    
  }
})
this.store.dispatch(getsingleQuestionId({id:this.id}))
  // this.store.select(my).subscribe((question)=>{
  //   if(question){
  //     this.question=question
  //     console.log(this.question)
  //   }
  // })

  this.store.select(usersSliceState).subscribe((user)=>{
    this.userId= user.Id
    
  })

  
  // add answer
this.answerForm=this.fb.group({
  answer_text:[null]
})

// add comment form
this.commentForm=this.fb.group({
  comment_text:[null]
})




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




// addComment(answerId: string) {
//   const comment: Comment = { /* comment data */ };
//   this.quizService.addComment(comment, answerId).subscribe((newComment) => {
//     this.store.dispatch(addComment({ comment: newComment, answerId }));
//   });
// }
// <form (ngSubmit)="addComment(answer.id)">
//   <input type="text" name="commentText" [(ngModel)]="commentText">
//   <button type="submit">Add Comment</button>
// </form>
// addComment(comment: Comment, answerId: string): Observable<Comment> {
//   return this.http.post<Comment>(`http://localhost:5500/answer/${answerId}/addComment`, comment);
// }



getUpvoteCount(answer: any): number {
  return answer?.Votes?.filter((v: any) => v.vote_type === 'upvote').length || 0;
}

getDownvoteCount(answer: any): number {
  return answer?.Votes?.filter((v: any)=> v.vote_type === 'downvote').length || 0;
}


}
