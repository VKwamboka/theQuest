import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AuthState, initialAuthState, UsersState,initialUsersState } from '../states/authState';
import { loginSuccess, loginFailure, logout, login, updateUserProfileSuccess, register,registerFailure,registerSuccess, getAllUsersSuccess, getAllUsersFailure, deleteUserSuccess, deleteUserFailure } from  '../actions/authActions'


const usersSliceState= createFeatureSelector<UsersState>('users')
export const allusers= createSelector(usersSliceState, state=>state.users)
  const userId= createSelector(usersSliceState, state=>state.Id)

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

//   const updatedBooking=state.bookings.map(item=>{
//     return item.Id===action.booking.Id?action.booking:item
// })

// return{
//     ...state,
//     updateError:'',
//     bookings:updatedBooking
// }

  // delete user
  on(deleteUserSuccess, (state, actions): UsersState => {
    const notdeletedUsers = state.users.filter(user => {
      console.log(notdeletedUsers)
      return user.userId !== actions.message.userID;
    });
    return {
      ...state,
      error: '',
      users: notdeletedUsers
    };
  }),

  on(deleteUserFailure, (state, actions):UsersState => ({
    ...state,

    error:actions.errorMessage,
    
  })),
)