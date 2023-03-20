import { RequestHandler,Request,Response,NextFunction } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import { DecodedData } from '../interfaces/userInterface'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request{
info?:DecodedData
}

export function VerifyToken (req:ExtendedRequest, res:Response,next:NextFunction){
const token = req.headers.authorization?.split(' ')[1]
// console.log(token)
try {
    
    if(!token){
        return res.status(401).json({error:'Forbidden'})
    }
    // console.log(Payloadata)
    const Payloadata= jwt.verify(token, process.env.JWT_SECRET as string) as DecodedData
   
   req.info= Payloadata
   next()
    } 
catch (error:any) {
   return res.status(403).json(error.message) 
}

}