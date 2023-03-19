import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from '../states/authState';
import { loginSuccess, loginFailure, logout, login, updateUserProfileSuccess } from  '../actions/authActions'
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
  
  on(logout, () => initialAuthState),
);