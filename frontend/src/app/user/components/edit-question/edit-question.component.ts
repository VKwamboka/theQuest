import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AppState } from 'src/app/core/states/appState';
import { Observable } from 'rxjs';
import { FullQuestion, Question } from 'src/app/interfaces/question';
import { myQuestions, oneQuestion } from 'src/app/shared/reducers/question';
import { addQuestion, getQuestions, updateQuestion } from 'src/app/shared/actions/question';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent {
  form!:FormGroup
  id!:string
  question!: FullQuestion
  question$!:Observable<Question[]>

  constructor(private fb:FormBuilder,public auth:AuthService,private route:ActivatedRoute, private store:Store<AppState>,private router:Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Title:['',[Validators.required]],
      Body:['',[Validators.required]],
      Code:['']
    })
    // this.question$ = this.store.select(myQuestions)

    this.route.params.subscribe((param:Params)=>{
      this.id=param['id']
      })

    this.store.select(oneQuestion).subscribe((question)=>{
      if(question){
        console.log(question)
        this.form.setValue({
          Title:question.Title,
          Body:question.Body,
          Code:question.Code
        })
        // console.log(this.comments)
        
      }
    })

    // this.store.dispatch(updateQuestion({updatedQuestion:this.form.value,id:this.id}))
  }

  

  submitForm(){
    this.store.dispatch(updateQuestion({id:this.id,updatedQuestion:this.form.value}))
    this.router.navigate(['/user/my-questions'])
    this.form.reset()
  }

}
