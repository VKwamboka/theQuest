import ejs from 'ejs'
import { sendEmail } from '../helpers/email';
import mssql from 'mssql'
import { sqlConfig } from '../config';
import { User } from '../interface/user';


 const changeForgotPasswordMail = async()=>{
    const pool = await mssql.connect(sqlConfig)
    const users:User[]= await(await pool.request().
    execute('GetUsersForForgotPasswordEmail')).recordset
    console.log(users);

for(let user of users){
    ejs.renderFile('template/forgotPassword.ejs',{name:user.Name}, async(error, html)=>{
    const message = {
    from: process.env.SMTP_USER_EMAIL,
    to: user.Email,
    subject: "Password reset request",
    html
};


 try {
await sendEmail(message) 
await pool.request().query(`UPDATE ansers SET isSent ='1' WHERE userId  ='${user.userId}'`)
 } catch (error) {
    console.log(error);
    
 }  
})
}    
}

export default changeForgotPasswordMail


