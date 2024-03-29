import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{AuthGuardService} from './core/services/authGuard.service'


const routes: Routes = [
  
  {path:'', loadComponent:()=>import('./shared/components/landing-page/landing-page.component').then(l=>l.LandingPageComponent)},
  {path:'login', loadComponent:()=>import('./core/login/login.component').then(l=>l.LoginComponent)},
  {path:'register', loadComponent:()=>import('./core/signup/signup.component').then(l=>l.SignupComponent)},
  {path:'forgot-password', loadComponent:()=>import('./user/components/forgot-pass/forgot-pass.component').then(l=>l.ForgotPassComponent)},
  {path:'reset-password', loadComponent:()=>import('./user/components/reset-password/reset-password.component').then(l=>l.ResetPasswordComponent)},

  {
    path:'user', loadComponent:()=>import('./user/components/userdashboard/userdashboard.component').then(l=>l.UserdashboardComponent),children:[
      {path:'profile',  loadComponent:()=>import('./user/components/userprofile/userprofile.component').then(l=>l.UserprofileComponent)},
      {path:'all-questions', loadComponent:()=>import('./shared/components/question/question.component').then(l=>l.QuestionComponent)},
      {path:'my-questions', loadComponent:()=>import('./user/components/user-questions/user-questions.component').then(l=>l.UserQuestionsComponent)},
      {path:'edit-question/:id', loadComponent:()=>import('./user/components/edit-question/edit-question.component').then(l=>l.EditQuestionComponent)},
      {path:'ask-question', loadComponent:()=>import('./user/components/ask-question/ask-question.component').then(l=>l.AskQuestionComponent)},
      {path:'edit-profile',  loadComponent:()=>import('./user/components/editprofile/editprofile.component').then(l=>l.EditprofileComponent)},
      {path:'',loadComponent:()=>import('./shared/components/question/question.component').then(l=>l.QuestionComponent)},
      {path:'full-question/:id', loadComponent:()=>import('./user/components/full-question/full-question.component').then(l=>l.FullQuestionComponent)},
      // {path:'deleteQuestion/:id', loadComponent:()=>import('./user/components/full-question/full-question.component').then(l=>l.FullQuestionComponent)},

    ]
  },
  {
    path:'admin', canActivate:[AuthGuardService], loadComponent:()=>import('./admin/components/adminashboard/adminashboard.component').then(l=>l.AdminashboardComponent),children:[
      {path:'', loadComponent:()=>import('./admin/components/admincontent/admincontent.component').then(l=>l.AdmincontentComponent)},
      {path:'manage-users', loadComponent:()=>import('./admin/components/manage-users/manage-users.component').then(l=>l.ManageUsersComponent)},
      {path:'manage-questions',loadComponent:()=>import('./admin/components/manage-questions/manage-questions.component').then(l=>l.ManageQuestionsComponent)},
      {path:'full-question/:id', loadComponent:()=>import('./user/components/full-question/full-question.component').then(l=>l.FullQuestionComponent)},


    ]
  },
  {path:'question', loadComponent:()=>import('./shared/components/question/question.component').then(l=>l.QuestionComponent)},
  
  {path:'fullquestion', loadComponent:()=>import('./user/components/full-question/full-question.component').then(l=>l.FullQuestionComponent)},
  {path:'**', loadComponent:()=>import('./not-found/not-found.component').then(l=>l.NotFoundComponent)},

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
