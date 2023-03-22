
export interface User {
  userId: string;
    Name: string;
    Email: string;
    password: string;
    confirmPassword: string;
    Role: string;
    JWT: string;
  }
export interface AdminUsers{
  
  Name:string
  Email:string
  Role:string
  isDeleted:boolean
  createdAt:Date
  updatedAt:Date
}
  export interface Register{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface Login {
    users: User[];
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

export interface RegisterUser{
  Name:string
  Email:string
  Password:string
  ConfirmPassword:string
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
