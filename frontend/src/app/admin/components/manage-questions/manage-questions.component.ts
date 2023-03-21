import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { QuestionService } from 'src/app/shared/services/question.service';
import { AuthService } from 'src/app/core/services/auth';
import { Store } from '@ngrx/store';
import { getQuestions ,deleteQuestion} from 'src/app/shared/actions/question';
import { Observable } from 'rxjs';
import { Question } from 'src/app/interfaces/question';
import { myQuestions } from 'src/app/shared/reducers/question';
import { AppState } from 'src/app/core/states/appState';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent {
  questions$!:Observable<Question[]>
  id!:string
constructor(public auth:AuthService, private router:Router, private store:Store<AppState>){}

ngOnInit(): void {
  // get questions
this.questions$ =this.store.select(myQuestions)
this.store.dispatch(getQuestions())

}

Delete(){
  
  this.store.dispatch(deleteQuestion({id:this.id}))
  this.router.navigate(['/admin/manage-questions'])
}

}
