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
import { TruncateQuizPipe } from 'src/app/pipes/truncate-quiz.pipe';
import { PaginatePipe } from 'src/app/pipes/paginate.pipe';
// import { QuestionService } from '../../services/question.service';


@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule,RouterModule,TimePipe,TruncateQuizPipe,PaginatePipe],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [TimeAgoPipe],
})
export class QuestionComponent {
  pageNumber = 1;
  pageSize = 10;
  currentPage!:number
  questions!: Question[];
  totalPages!: number;
  pageNumbers!: number[];
  public pages: number[] = [];

  questions$!:Observable<Question[]>
constructor(public auth:AuthService, private router:Router, private questionService:QuestionService, private store:Store<AppState>){}

ngOnInit(): void {
  // get questions
this.questions$ =this.store.select(myQuestions)
this.store.dispatch(getQuestions())

this.questionService.getPagedQuestions(this.pageNumber, this.pageSize=10).subscribe(
  response => {
    this.questions = response;
    // this.totalPages = response.length/5;
    // console.log(this.totalPages)
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    
    // console.log(this.totalPages)
  },
  error => {
    console.log(error);
  }

  
);;

}


// pagination
getQuestions(pageNumber?: number, pageSize: number = 10) {
  this.questionService.getPagedQuestions(this.pageNumber, pageSize).subscribe(
    response => {
      this.questions = response;
      this.totalPages = response.length/10;
      console.log(this.totalPages)
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);

      if (this.pageNumber > 1) {
        this.pageNumber--;
        // this.getQuestions();
      }
       if (this.pageNumber < this.totalPages) {
    this.pageNumber++;
    // this.getQuestions();
  }
    },
    error => {
      console.log(error);
    }
  );;
}

previousPage() {
  if (this.pageNumber > 1) {
    this.pageNumber--;
    // this.getQuestions();
  }
}

nextPage() {
  if (this.pageNumber < this.totalPages) {
    this.pageNumber++;
    // this.getQuestions();
  }
}

goToPage(page: number) {
  this.pageNumber = page;
  // this.getQuestions();
}



}

