import Bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import {v4 as uid} from 'uuid'
import { RequestHandler,Request,Response } from 'express'
import { UserSignUpHelper, UserSignInHelper, UserUpdateProfileHelper,UserUpdatePasswordHelper } from '../helpers/userHelper'
import { DecodedData, User } from '../interfaces/userInterface'
import { DatabaseUtils } from "../utilis/dbUtilis";
import { sendEmail } from '../utilis/background-services/helpers/email'
import { JWTPayload } from '../interfaces/jwtayload'

const  _db = new DatabaseUtils()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const jwtSecret = process.env.JWT_SECRET as string;

// user jwt
const generateJWT = (payload: any, expiresIn: string) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn,
  });
};

// register user    
export const RegisterUser = async (req: Request, res: Response) => {
    try {

      const { Name, Email, Password } = await UserSignUpHelper.validateAsync(
        req.body
        )
        const salt = await Bcrypt.genSalt(10)
        const hashedPassword = await Bcrypt.hash(Password, salt)
        const user: User = {
        userId: uid(),
        Name,
        Email,
        Password: hashedPassword,
        }

      // check if user exists
      const userReg = await _db.exec("usp_FindUserByEmail", { Email });
       // check if user was soft deleted
    if (userReg.recordset.length > 0 &&userReg.recordset[0].isDeleted) {
      return res.status(400).json({
        message:
          "Email has been registered before, please try another email or contact support",
      });
    }

    if (userReg.recordset.length > 0) {
      return res.status(400).json({
        message:
          "User with similar email already exists, please try another email",
      });
    }
        
      const result = await _db.exec('registerUser', user)

       if(result.recordset.length > 0){
        const token = jwt.sign(
          { userId: result.recordset[0].userId,Email: result.recordset[0].Email },
          process.env.JWT_SECRET as string,
          { expiresIn: '1d' }
          )
          res.status(201).json({
              
          status: 'User registered successfully',
          data: {
              token,
          },
          })

        }
        
       
    } catch (error) {
        res.status(500).json(error) 
   
    }
}


interface ExtendedRequest extends Request{
  body:{Name:string , location:string, bio:string, Email:string,Password:string, ConfirmPassword:string}
  // params:{userId:string},
  info?:DecodedData
}

// login user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = await UserSignInHelper.validateAsync(req.body)

        const user = await _db.exec('usp_FindUserByEmail', { Email })
        if (user.recordset.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        const validPassword = await Bcrypt.compare(Password, user.recordset[0].Password)
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        const token = jwt.sign(
            { userId: user.recordset[0].userId, Email: user.recordset[0].Email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        )
        res.status(200).json({
            status: 'User logged in successfully',
            data: {
                token,
            },
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


// get user profile

export const getProfile=async(req:ExtendedRequest,res:Response)=>{
  try {
    const userId = req.params.userId as string;
    const user:User= await (await  _db.exec('getProfile', {userId })).recordset[0]
    if(!user){
       return res.status(404).json({error:'User Not Found'})
    }
  
    return res.status(200).json(user)
  
  } catch (error) {
    return res.status(500).json(error)
  }
  
  }

// update profile
export  const updateProfile = async(req:ExtendedRequest,res:Response)=>{
  try {
  
  const Id = req.params.id as string;
  const {Name,Email,location,bio}= await UserUpdateProfileHelper.validateAsync(req.body) 
  const profile:User[]= await (await _db.exec('getProfile', {userId:Id} )).recordset
  
  if(profile){
    console.log(profile)
    await _db.exec('usp_UpdateUser', {userId:Id, Name:Name, Email:Email, location:location, bio:bio})
    return res.status(200).json({message:'Updated user'})
  }
    return res.status(404).json({error:'Oops! User Not Found'}) 
  // res.json(profile)
       
    } 
  
  catch (error:any) {
     res.status(500).json(error.message)
  }
  }

  // get all users
  export const getAllUsers=async(req:ExtendedRequest,res:Response)=>{
    try {
      const users:User[]= await (await  _db.exec('GetAllUsers')).recordset
      if(!users){
         return res.status(404).json({error:'No Users Found'})
      }
    
      return res.status(200).json(users)
    
    } catch (error) {
      return res.status(500).json(error)
    } 
    
  }

  // delete user
  export const deleteUser=async(req:ExtendedRequest,res:Response)=>{
    try {
      const userId = req.params.id
      const user:User= await (await  _db.exec('usp_FindUserById', {userId})).recordset[0]
      console.log(req.params)
      if(!user){
         return res.status(404).json({error:'User Not Found'})
      }
      await _db.exec('deleteUser', {userId})
      return res.status(200).json({message:'User deleted'})
    
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  // get user by id
  export const getUserById=async(req:ExtendedRequest,res:Response)=>{
    try {
      const userId = req.params.userId
      const user:User= await (await  _db.exec('usp_FindUserById', {userId})).recordset[0]
      if(!user){
         return res.status(404).json({error:'User Not Found'})
      }
    
      return res.status(200).json(user)
    
    } catch (error) {
      return res.status(500).json(error)
    }
    
  }

  // update password
  export const updatePassword=async(req:ExtendedRequest,res:Response)=>{
    try {
      const userId = req.params.userId
      
      const user:User= await (await  _db.exec('usp_FindUserById', {userId})).recordset[0]
      if(!user){
         return res.status(404).json({error:'User Not Found'})
      }
      const hashedPassword= await Bcrypt.hash(req.body.Password,10)
      await _db.exec('usp_UpdateUser', {userId,password:hashedPassword})
      return res.status(200).json({message:'Password updated'})
    
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  // update password
  export const updatePasswordUser = async (req: ExtendedRequest, res: Response) => {
    try{
      const userId = req.params.id
      const user:User= await (await  _db.exec('usp_FindUserById', {userId})).recordset[0]
      if(!user){
         return res.status(404).json({error:'User Not Found'})
      }
      // get name and email
      const {Name,Email}= await (await  _db.exec('getProfile', {userId})).recordset[0]

      const {Password,ConfirmPassword}= await UserUpdatePasswordHelper.validateAsync(req.body)
      if(Password !== ConfirmPassword){
        return res.status(400).json({message:'Passwords do not match'})
      }
      const hashedPassword= await Bcrypt.hash(Password,10)
      await _db.exec('usp_UpdateUser', {userId,password:hashedPassword})

      //password reset was successful email
      const subject = "Password Reset Successful";
      const html = `<h1>Password Reset Successful</h1>
      <p>Dear ${Name},</p>
      <p>Your password has been reset successfully.</p>
      <p>If you did not request this, please contact us immediately.</p>
      <p>Regards,<br/>The OverFlow</p>
      <P>Happy Coding 🎉</P>`;
      console.log(Email);
      
      sendEmail(subject, Email, html);
      
      return res.status(200).json({message:'Password updated'})
      
    }
    catch(error){
      return res.status(500).json(error)
    }
  }

  // send email to user during forgot password
  export const sendEmailToUser = async (req: Request, res: Response) => {
    try{
      const Email = req.body.email
      console.log(req.body);
      const user:User= await (await  _db.exec('usp_FindUserByEmail', {Email})).recordset[0]      

      if(!user){
         return res.status(404).json({error:'User Not Found'})
      }

      const { userId, Name } = user
     
    

      const JWT = generateJWT({ userId, Name, Email } as JWTPayload, "1h");
  
      const resetUrl = `${process.env.CLIENT_URL}/reset-password/?resetToken=${JWT}`;
  
      const passwordResetMsg = `
        <h1>You requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>If you did not request this, please ignore this email</p>
      `;

      try {
        await sendEmail("Password Reset Request", Email, passwordResetMsg);
  
        return res.status(200).json({
          message: "We have sent a link to reset your password to your email",
          resetUrl,
        });
      } catch (error: any) {
        // console.log(error);
        return res.status(500).json({ message: "Email could not be sent" });
      }

    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }