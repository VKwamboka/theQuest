
export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin?: boolean;
    JWT: string;
  }
  
  export interface Login {
    email: string;
    password: string;
    JWT: string;
    isAdmin?: boolean;
  }
  
  export interface UserProfile {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  }



//   export interface User{
//     Name:string
//     Email:string
//     Password:string
// }

export interface Message{
    message:string
}

export interface LoginUser{
    Email:string
    Password:string
}

export interface LoginSuccess{
    message:string
    token:string
    role:string
    name:string
}
