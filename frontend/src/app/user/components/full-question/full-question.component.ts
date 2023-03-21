import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightCodeDirective } from 'src/templates/highlight-code.directive';
import { QuestionService } from 'src/app/shared/services/question.service';
import { iif, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppState } from 'src/app/core/states/appState';
import { FullQuestion, Question } from 'src/app/interfaces/question';
import { getsingleQuestionId } from 'src/app/shared/actions/question';
import { oneQuestion } from 'src/app/shared/reducers/question';
import {Answer} from 'src/app/interfaces/answer'
// import { oneQuestion} from 'src/app/shared/reducers/question';
// import {Quest}
// import { getSingleQuestion } from 'src/app/shared/reducers/question';

@Component({
  selector: 'app-full-question',
  standalone: true,
  imports: [CommonModule, HighlightCodeDirective],
  templateUrl: './full-question.component.html',
  styleUrls: ['./full-question.component.css'],
  // hostDirectives: [HighlightCodeDirective]

})
export class FullQuestionComponent {
  question!: FullQuestion
  id!:string
  answers!:Answer[]

  constructor(private route:ActivatedRoute, private router:Router ,private store:Store<AppState>){}

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id']
      this.store.dispatch(getsingleQuestionId({id:params['id']}))
    })
  

this.store.select(oneQuestion).subscribe((question)=>{
  if(question){
    this.question=question
    this.answers=JSON.parse(question.Answers) 
    console.log(this.question);
    
  }
})
this.store.dispatch(getsingleQuestionId({id:this.id}))
  // this.store.select(my).subscribe((question)=>{
  //   if(question){
  //     this.question=question
  //     console.log(this.question)
  //   }
  // })

}


// Update


// delete


// highlightBlock: any;

}
