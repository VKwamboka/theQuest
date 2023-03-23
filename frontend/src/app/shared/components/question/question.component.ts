import { Component,OnInit ,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { AuthService } from 'src/app/core/services/auth';
import { Store } from '@ngrx/store';
import { getQuestions } from '../../actions/question';
import { Observable } from 'rxjs';
import { Question } from 'src/app/interfaces/question';
import { myQuestions } from '../../reducers/question';
import { AppState } from 'src/app/core/states/appState';
import { TimeAgoPipe } from 'src/app/pipes/time-ago.pipe';
import { TimePipe } from 'src/app/pipes/time.pipe';


@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule,RouterModule,TimePipe],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [TimeAgoPipe],
})
export class QuestionComponent {
  questions$!:Observable<Question[]>
constructor(public auth:AuthService, private router:Router, private store:Store<AppState>){}

ngOnInit(): void {
  // get questions
this.questions$ =this.store.select(myQuestions)
this.store.dispatch(getQuestions())

}


}

