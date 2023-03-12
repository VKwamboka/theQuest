import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {path:'', loadComponent:()=>import('./landing-page/landing-page.component').then(l=>l.LandingPageComponent)},
  {path:'login', loadComponent:()=>import('./core/login/login.component').then(l=>l.LoginComponent)},
  {path:'register', loadComponent:()=>import('./core/signup/signup.component').then(l=>l.SignupComponent)},
  {
    path:'user', loadComponent:()=>import('./user/userdashboard/userdashboard.component').then(l=>l.UserdashboardComponent),children:[
      {path:'profile', loadComponent:()=>import('./user/userprofile/userprofile.component').then(l=>l.UserprofileComponent)},
      {path:'all-questions', loadComponent:()=>import('./question/question.component').then(l=>l.QuestionComponent)},
      {path:'ask-question', loadComponent:()=>import('./user/ask-question/ask-question.component').then(l=>l.AskQuestionComponent)},
      {path:'edit-profile', loadComponent:()=>import('./user/editprofile/editprofile.component').then(l=>l.EditprofileComponent)},
      {path:'', loadComponent:()=>import('./question/question.component').then(l=>l.QuestionComponent)},
      {path:'full-question', loadComponent:()=>import('./user/full-question/full-question.component').then(l=>l.FullQuestionComponent)},

    ]
  },
  {
    path:'admin', loadComponent:()=>import('./admin/adminashboard/adminashboard.component').then(l=>l.AdminashboardComponent),children:[
      {path:'', loadComponent:()=>import('./admin/admincontent/admincontent.component').then(l=>l.AdmincontentComponent)},
      {path:'manage-users', loadComponent:()=>import('./admin/manage-users/manage-users.component').then(l=>l.ManageUsersComponent)},
      {path:'manage-questions', loadComponent:()=>import('./admin/manage-questions/manage-questions.component').then(l=>l.ManageQuestionsComponent)},
      

    ]
  },
  {path:'question', loadComponent:()=>import('./question/question.component').then(l=>l.QuestionComponent)},
  
  {path:'fullquestion', loadComponent:()=>import('./user/full-question/full-question.component').then(l=>l.FullQuestionComponent)},
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
