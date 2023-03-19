
export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    Role: string;
    JWT: string;
  }
  
  export interface Login {
    email: string;
    password: string;
    JWT: string;
    Role:string
  }
  
  export interface UserProfile {
    id: number;
    name: string;
    email: string;
    Role:string;
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
    data: {
      token: string;
     
    };
    Role:string
    Name:string
    // token:string
    
}
