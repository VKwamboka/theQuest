import { Component,OnInit ,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { QuestionService } from 'src/app/shared/services/question.service';
import { AuthService } from 'src/app/core/services/auth';
import { Store } from '@ngrx/store';
import { deleteQuestionByUser, getQuestions ,getUserQuestions} from 'src/app/shared/actions/question';
import { Observable } from 'rxjs';
import { Question } from 'src/app/interfaces/question';
import { userQuestion } from 'src/app/shared/reducers/question';
import { AppState } from 'src/app/core/states/appState';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  id!:string
  question!:Question[]
  questions$!:Observable<Question[]>
  constructor(public auth:AuthService,private store:Store<AppState>){}

  ngOnInit(): void {
  
    this.store.select(userQuestion).subscribe((questions)=>{
      if(questions){
        this.question=questions
    
        
      }
    })
  
    
    this.store.dispatch(getUserQuestions())
    
    }
}
