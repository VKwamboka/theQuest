import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '../actions/authActions'
import { login, loginSuccess, loginFailure, register,registerFailure,registerSuccess } from '../actions/authActions';
import { LoginSuccess, LoginUser, User,Register } from  '../../interfaces/user';
import { AuthenticationService } from '../services/authentication';

@Injectable()
export class AuthEffects {
  
   
  constructor(private actions$: Actions, private authService: AuthenticationService ) {}

  login$ = createEffect(()=>{
    return  this.actions$.pipe( ofType(login),
    tap(action =>{console.log(action.userlogged)}),
    concatMap(action=>{
      return this.authService.loginUser(action.userlogged).pipe(
        
        map((loginsuccess:LoginSuccess) => loginSuccess({ loginSuccess:loginsuccess})),
          catchError((error) => of(loginFailure(error)))
      )
  })
    )
  }
   
  );

  // register user
  register$ = createEffect(()=>{
    return  this.actions$.pipe( ofType(register),
    tap(action =>{console.log(action.userRegistered)}),
    concatMap(action=>{
      return this.authService.registerUser(action.userRegistered).pipe(
        
        map((registersuccess:LoginSuccess) => registerSuccess({ registerSuccess:registersuccess})),
          catchError((error) => of(loginFailure(error)))
      )
  })
    )
  }

  
   
  );
  // get all users
  getAllUsers$ = createEffect(()=>{
    return  this.actions$.pipe( ofType(UserActions.getAllUsers),
    mergeMap(()=>{
      return this.authService.getAllUsers().pipe(
        
        map((users:User[]) => UserActions.getAllUsersSuccess({ Users:users})),
          catchError((error) => of(UserActions.getAllUsersFailure(error)))
      )
  })
    )
  });


  // update user
  updateUser = createEffect(()=>{
    return this.actions$.pipe(
        ofType(UserActions.updateUserProfile),
        concatMap(action=>{
            return  this.authService.updateUser(action.id,action.user).pipe(
                map(successresponse=>{
                    return UserActions.updateUserProfileSuccess({user:successresponse})
                }),
                catchError(error=>of(UserActions.updateUserProfileFailure(error.error.message)))
            )
        })
    )
})

// delete user
deleteUser = createEffect(()=>{
  return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      concatMap(action=>{
          return  this.authService.deleteUser(action.id).pipe(
              map(message=>{
                  return UserActions.deleteUserSuccess({message:message})
              }),
              catchError(error=>of(UserActions.deleteUserFailure(error.error.message)))
          )
      })
  )
})
}