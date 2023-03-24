import { Component,OnInit ,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { QuestionService } from 'src/app/shared/services/question.service';
import { AuthService } from 'src/app/core/services/auth';
import { Store } from '@ngrx/store';
import { deleteQuestionByUser, getQuestions ,getUserQuestions} from 'src/app/shared/actions/question';
import { Observable } from 'rxjs';
import { Question } from 'src/app/interfaces/question';
import { oneQuestion, userQuestion } from 'src/app/shared/reducers/question';
import { AppState } from 'src/app/core/states/appState';
import { Answer } from 'src/app/interfaces/answer';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { TruncateQuizPipe } from 'src/app/pipes/truncate-quiz.pipe';
import { OrderingPipe } from 'src/app/pipes/ordering.pipe';
import { FormsModule } from '@angular/forms';
import { SearchingPipe } from 'src/app/pipes/searching.pipe';





@Component({
  selector: 'app-user-questions',
  standalone: true,
  imports: [CommonModule,TimePipe,RouterModule,OrderingPipe, TruncateQuizPipe,FormsModule,SearchingPipe],
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.css']
})
export class UserQuestionsComponent {

  id!:string
  question!:Question[]
  userQuestion!:Question
  answers:Answer[]=[]
  questions$!:Observable<Question[]>
  sortBy = 'newest'
  // searchQuery: string = ''; 
  searchType?: string = 'Keyword';
  searchTerm?: string;
constructor(public auth:AuthService, private router:Router, private store:Store<AppState>){}

ngOnInit(): void {
 
this.store.select(userQuestion).subscribe((questions)=>{
  if(questions){
    this.question=questions
   
    
  }
})

this.store.select(oneQuestion).subscribe((question)=>{
  if(question){
    this.userQuestion=question
    this.answers=JSON.parse(question.Answers) 
    
  }
})

this.store.dispatch(getUserQuestions())

}

Delete(id:string){
  
  this.store.dispatch(deleteQuestionByUser({id}))
 
 
}


}
