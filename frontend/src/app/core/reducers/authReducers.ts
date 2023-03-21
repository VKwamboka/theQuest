import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AuthState, initialAuthState, UsersState,initialUsersState } from '../states/authState';
import { loginSuccess, loginFailure, logout, login, updateUserProfileSuccess, register,registerFailure,registerSuccess, getAllUsersSuccess, getAllUsersFailure, deleteUserSuccess, deleteUserFailure } from  '../actions/authActions'
// import { User } from '../../interfaces/user';

const usersSliceState= createFeatureSelector<UsersState>('question')
export const allusers= createSelector(usersSliceState, state=>state.users)

export const authReducer = createReducer<AuthState>(
  initialAuthState,
  // on(login, (state,actions) => ({ ...state, error: null })),
  on(loginSuccess, (state, actions):AuthState => ({
    ...state,
    isLoggedIn: true,
    user: actions.loginSuccess,
    errorMessage: null,
  })),
  on(loginFailure, (state, actions):AuthState => ({
    ...state,
    isLoggedIn: false,
    user: null,
    errorMessage:actions.errorMessage,
  })),
  on(updateUserProfileSuccess,(state,action):AuthState=>{

    const updatedUser=state.user

    return{
        ...state,
        errorMessage:'',
        user:updatedUser
    }
 }),

//  register success
on(registerSuccess, (state, actions):AuthState => ({
  ...state,
  isLoggedIn: true,
  user: actions.registerSuccess,
  errorMessage: null,
})),

// register failure
on(registerFailure, (state, actions):AuthState => ({
  ...state,
  isLoggedIn: false,
  user: null,
  errorMessage:actions.errorMessage,
})),


  
  on(logout, () => initialAuthState),
);

export const allUsersState = createReducer<UsersState>(
  initialUsersState ,
    // get all users
  on(getAllUsersSuccess, (state, actions):UsersState => ({
    ...state,
    error:'',
    users: actions.Users
  })
  ),

  on(getAllUsersFailure, (state, actions):UsersState => ({
    ...state,
    error:actions.errorMessage,
    users:[]
  })
  ),

  // delete user
  on(deleteUserSuccess, (state, actions):UsersState => ({
    ...state,
    error:'',
    users: state.users.filter(user=>user.id!== actions.id)
  })),

  on(deleteUserFailure, (state, actions):UsersState => ({
    ...state,

    error:actions.errorMessage,
    
  })),
)