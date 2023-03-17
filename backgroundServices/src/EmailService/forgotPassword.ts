// import ejs from 'ejs'
// import { sendEmail } from '../helpers/email';
// import mssql from 'mssql'
// import { sqlConfig } from '../config';
// import { User } from '../interface/user';

//  const changeForgotPasswordMail = async()=>{
//     const pool = await mssql.connect(sqlConfig)
//     const users:User[]= await(await pool.request().
//     execute('GetUsersForForgotPasswordEmail')).recordset
//     console.log(users);

// for(let user of users){
//     ejs.renderFile('template/forgotPassword.ejs',{name:user.Name}, async(error, html)=>{
//     const message = {
//     from: process.env.SMTP_USER_EMAIL,
//     to: user.Email,
//     subject: "Password reset request",
//     html
// };

//  try {
// await sendEmail(message)
// await pool.request().query(`UPDATE ansers SET isSent ='1' WHERE userId  ='${user.userId}'`)
//  } catch (error) {
//     console.log(error);

//  }
// })
// }
// }

// export default changeForgotPasswordMail

import ejs from "ejs";
import mssql from "mssql";
import { sqlConfig } from "../config";
import { User } from "../interface/user";
import dotenv from "dotenv";
import path from "path";
import { generateJWT } from "../helpers/generateJWT";
import { sendEmail } from "../helpers/email";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });



const sendForgotPasswordEmail = async () => {
  const pool = await mssql.connect(sqlConfig);
  const users: User[] = await (
    await pool.request().query("SELECT * FROM users WHERE forgetPassword = 1")
  ).recordset;
console.log(users);
//   const user:User[]= await(await pool.request().
//   query("SELECT * FROM users WHERE isSent ='0'")).recordset[0]
//   console.log(user);

  for (let user of users) {
    const email = user.Email; 
  try {
    // Check if the user exists
    const user = await pool
      .request()
      .input("Email", mssql.NVarChar, email)
      .query("SELECT * FROM users WHERE Email = @Email");
        console.log(user);

    if (!user.recordset.length) {
      throw new Error("User not found");
    }

    const { userId, Name } = user.recordset[0];

    // Generate a JWT token that includes the user ID and name
    const JWT = generateJWT({ userId, Name, Email: email }, "1h");

    // Construct the password reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/?resetToken=${JWT}`;

    // Render the email template
    ejs.renderFile(
      "template/forgotPassword.ejs",
      { name: Name, resetUrl },
      async (error, html) => {
        if (error) {
          console.log(error);
          throw new Error("Error rendering email template");
        }

        // Send the email
        const message = {
          from: process.env.SMTP_USER_EMAIL,
          to: email,
          subject: "Password Reset",
          html,
        };

        try {
          await sendEmail(message);
          // Update the forgetPassword column to 1
        
            await pool.request().execute(`forgetOne`)

        } catch (error) {
          console.log(error);
          throw new Error("Error sending email");
        }
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error resetting password");
  }
};
}

const sendPasswordUpdatedEmail = async () => {
  const pool = await mssql.connect(sqlConfig);

  try {
    // Get all users whose forgetPassword value is 2
    const users: User[] = await (
      await pool
        .request()
        .query("SELECT * FROM users WHERE forgetPassword = 2")
    ).recordset;

    for (let user of users) {
      // Render the email template
      ejs.renderFile(
        "template/updatedPassword.ejs",
        { name: user.Name },
        async (error, html) => {
          if (error) {
            console.log(error);
            throw new Error("Error rendering email template");
          }

          // Send the email
          const message = {
            from: process.env.SMTP_USER_EMAIL,
            to: user.Email,
            subject: "Password Updated",
            html,
          };

          try {
            await sendEmail(message);
            // Reset the forgetPassword column to 0
            await pool
              .request().execute('forgetZero')
          } catch (error) {
            console.log(error);
            throw new Error("Error sending email");
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error sending password updated email");
  }
};

export { sendForgotPasswordEmail, sendPasswordUpdatedEmail };
