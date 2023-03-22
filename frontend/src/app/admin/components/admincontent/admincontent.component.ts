import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from 'src/app/shared/services/question.service';
import { AuthService } from 'src/app/core/services/auth';
import { Store } from '@ngrx/store';
import { getQuestions ,deleteQuestion} from 'src/app/shared/actions/question';
import { Observable } from 'rxjs';
import { Question } from 'src/app/interfaces/question';
import { myQuestions } from 'src/app/shared/reducers/question';
import { AppState } from 'src/app/core/states/appState';
import { allusers } from 'src/app/core/reducers/authReducers';
import { Answer } from 'src/app/interfaces/answer';
import { Vote } from 'src/app/interfaces/vote';
import { User } from 'src/app/interfaces/user';
import { getAllUsers } from 'src/app/core/actions/authActions';


@Component({
  selector: 'app-admincontent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admincontent.component.html',
  styleUrls: ['./admincontent.component.css']
})
export class AdmincontentComponent {
  questions$!:Observable<Question[]>
  users$!:Observable<User[]>
  questions!:Question[]
  // answers!:Answer[]
  votes!:Vote[]
  comments!:Comment[]
  users!:User[]

  totalAnswers = 0;
  totalComments = 0;
  totalVotes = 0;
 
constructor(public auth:AuthService,  private store:Store<AppState>){}

ngOnInit(): void {
  // get questions
this.questions$ =this.store.select(myQuestions)
this.store.dispatch(getQuestions())
// get all users
this.users$ = this.store.select(allusers)
this.store.dispatch(getAllUsers())

this.store.select(myQuestions).subscribe((question)=>{
  if(question){
    this.questions=question
    this.questions.forEach(question => {
      // const quizAnswers = JSON.parse(question.Answers);
      this.totalAnswers += question.Answers?.length;
      question.Answers?.forEach(answer => {
        this.totalComments += answer.Comments.length;
        this.totalVotes += answer.Votes.length;
      });
    });

    
  }
})

this.store.select(allusers).subscribe((user)=>{
  if(user){
    this.users=user
    // this.answers=JSON.parse(question.answers) 
  
    // console.log(this.comments)
    
  }
})

}




}
