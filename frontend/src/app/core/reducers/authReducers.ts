import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from '../states/authState';
import { loginSuccess, loginFailure, logout, login, updateUserProfileSuccess, register,registerFailure,registerSuccess } from  '../actions/authActions'
// import { User } from '../../interfaces/user';

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