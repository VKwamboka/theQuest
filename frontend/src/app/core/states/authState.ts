
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginSuccess, User } from "../../interfaces/user";

export interface AuthState {
    isLoggedIn: boolean
    loading: false
    Id:string,
    Name:string,
    Email:string,
    Password:string,
    user: LoginSuccess | null
    errorMessage: string | null
  }

  export interface UsersState {
    users:User[]
    Id:string,
    Name:string,
    Email:string,
    Role:string
    error: string | null
  }
   
  export const initialUsersState: UsersState ={
    users:[],
    Id:'',
    Name:'',
    Email:'',
    Role:'',
    error:'',
  }
  // export const initialUserState: UsersState = {
    
  //   Id:'',
  //   Name:'',
  //   Email:'',
  //   Role:''
  
  // };

  export const initialAuthState: AuthState = {
    isLoggedIn: false,
    loading: false,
    Id:'',
    Name:'',
    Email:'',
    Password:'',
    user: null,
    errorMessage: null,
  };

  export interface Logged {
    Name:string
    Email:string
    Password:string
    errorMessage: string | null
  }
  
  const userSliceState= createFeatureSelector<AuthState>('prof')

  export const profile= createSelector(userSliceState, state=>state.user)
  const myId= createSelector(userSliceState, state=>state.Id)


  export const getSingleUser=createSelector(profile,myId,(state)=>{
      return state
  })
  
 