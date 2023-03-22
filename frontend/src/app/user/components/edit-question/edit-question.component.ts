import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AppState } from 'src/app/core/states/appState';
import { Observable } from 'rxjs';
import { Question } from 'src/app/interfaces/question';
import { myQuestions } from 'src/app/shared/reducers/question';
import { addQuestion, getQuestions } from 'src/app/shared/actions/question';
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
  question$!:Observable<Question[]>

  constructor(private fb:FormBuilder,public auth:AuthService, private store:Store<AppState>,private router:Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Title:['',[Validators.required]],
      Body:['',[Validators.required]],
      Code:['']
    })
    this.question$ = this.store.select(myQuestions)
  }

  submitForm(){
    this.store.dispatch(addQuestion({newQuestion:this.form.value}))
    this.store.dispatch(getQuestions())
    this.router.navigate(['/user/my-questions'])
  }

}
