export interface User {
    userId: string;
    Name: string;
    Email: string;
    Password: string;
    // isDeleted?: boolean;
    // Role: string;
  }

  export interface DecodedData{
    userId: string,
    Name:string,
    Email:string,
    Role: string,
    iat: number,
    exp: number
  }
  