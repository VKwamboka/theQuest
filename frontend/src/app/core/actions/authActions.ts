import { createAction, props } from '@ngrx/store';
import { LoginSuccess, LoginUser, User , Register, RegisterUser, UserProfile, Message} from 'src/app/interfaces/user';

// login
export const login = createAction('[User]Login', props<{ userlogged:LoginUser}>());
export const loginSuccess = createAction('[User]Login Success', props<{loginSuccess:LoginSuccess}>());
export const loginFailure = createAction('[User]Login Failure', props<{errorMessage: string}>());

// update profile
export const updateUserProfile = createAction('[User]Update Profile', props<{user: User, id:string}>());
export const updateUserProfileSuccess = createAction('[User]Update Profile Success', props<{user: User}>());
export const updateUserProfileFailure = createAction('[User]Update Profile Failure', props<{errorMessage: string}>());

// logout
export const logout = createAction('[User]Logout');
export const logoutSuccess = createAction('[User]Logout Success');
export const logoutFailure = createAction('[User]Logout Failure', props<{errorMessage: string}>());

// register
export const register = createAction('[User]Register', props<{ userRegistered:RegisterUser}>());
export const registerSuccess = createAction('[User]register Success', props<{registerSuccess:LoginSuccess}>());
export const registerFailure = createAction('[User]register Failure', props<{errorMessage: string}>());


// get all users
export const getAllUsers = createAction('[User]Get All Users'); 
export const getAllUsersSuccess = createAction('[User]Get All Users Success', props<{Users: User[]}>());
export const getAllUsersFailure = createAction('[User]Get All Users Failure', props<{errorMessage: string}>());

// delete users
export const deleteUser = createAction('[User]Delete User', props<{id:string}>());
export const deleteUserSuccess = createAction('[User]Delete User Success', props<{message:Message}>());
export const deleteUserFailure = createAction('[User]Delete User Failure', props<{errorMessage: string}>());