import Bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import {v4 as uid} from 'uuid'
import { RequestHandler,Request,Response } from 'express'
import { UserSignUpHelper, UserSignInHelper } from '../helpers/userHelper'
import { DecodedData, User } from '../interfaces/userInterface'
import { DatabaseUtils } from "../utilis/dbUtilis";
import { sendEmail } from '../utilis/background-services/helpers/email'

const  _db = new DatabaseUtils()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

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
      return res.status(201).json({message:'User registered'})
        }
        
       
    } catch (error) {
        res.status(500).json(error) 
   
    }
}


interface ExtendedRequest extends Request{
  body:{Name:string , location:string, bio:string, Email:string,Password:string, ConfirmPassword:string}
  params:{userId:string},
  info?:DecodedData
}
// export async function RegisterUser(req:ExtendedRequest, res:Response){
// try {
//   const userId =uid()
//   const{Name,Email,Password} = req.body
//   console.log(req.body)
//   const {error} =UserSignUpHelper.validate(req.body)
//   if(error){
//       return res.status(422).json(error.details[0].message)
//   }
//   const hashedPassword= await Bcrypt.hash(Password,10)
//   await _db.exec('registerUser', {userId,name:Name,email:Email, password:hashedPassword})
//   return res.status(201).json({message:'User registered successfully'})

// } 
// catch (error) {
//   console.log(error)
//    res.status(500).json(error) 
// }
// }

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
    // const id = req.params.userId
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
export async function updateProfile(req:ExtendedRequest,res:Response){
  try {
  const {Name,Email,location,bio}= req.body
  const profile:User[]= await (await _db.exec('getProfile', {userId:req.params.userId} )).recordset
    
      if(profile.length){
        await _db.exec('usp_UpdateUser', {userId:req.params.userId,Name:Name, Email:Email, location:location, bio:bio})
        return res.status(200).json({message:'Updated user'})
      }
    return res.status(404).json({error:'User Not Found'}) 
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
      const userId = req.params.userId
      const user:User= await (await  _db.exec('usp_FindUserById', {userId})).recordset[0]
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
      await _db.exec('usp_UpdatePassword', {userId,password:hashedPassword})
      return res.status(200).json({message:'Password updated'})
    
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  // update user