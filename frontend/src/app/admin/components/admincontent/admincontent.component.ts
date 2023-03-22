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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ManageUsersComponent } from '../manage-users/manage-users.component';


@Component({
  selector: 'app-admincontent',
  standalone: true,
  imports: [CommonModule,RouterModule,ManageUsersComponent],
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

  // comments and answers
  answersitems!: Answer[];
  answerCount!: number;

  commentsitems!: Comment[];
  commentCount!: number;
 
constructor(public auth:AuthService, private http: HttpClient,private store:Store<AppState>){}

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
  }
})

this.store.select(allusers).subscribe((user)=>{
  if(user){
    this.users=user
    
  }
})

const accessToken = localStorage.getItem('token') || ' ';

// get number of answers
this.http.get<Answer[]>('http://localhost:5500/answer/getAnswers',{ headers: new HttpHeaders().set(
  'Authorization',
  'Bearer ' + accessToken
)}).subscribe((answersitems) => {
  this.answersitems = answersitems;
  this.answerCount = answersitems.length;
});


// get the number of comments
this.http.get<Comment[]>('http://localhost:5500/comment/getAllComments',{ headers: new HttpHeaders().set(
  'Authorization',
  'Bearer ' + accessToken
)}).subscribe((commentsitems) => {
  this.commentsitems = commentsitems;
  console.log(this.commentsitems)
  this.commentCount = commentsitems.length;
});
}




}
