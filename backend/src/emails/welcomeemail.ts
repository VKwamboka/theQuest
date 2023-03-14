import { User } from "../interfaces/userInterface";
import { DatabaseUtils } from "../utilis/dbUtilis";
import { sendEmail } from "../utilis/background-services/helpers/email";
import dotenv from "dotenv";
// import { CreateLog } from "../utils/logger.util";
dotenv.config({ path: __dirname + "/../../.env" });

const dbUtils = new DatabaseUtils();

//send welcome email to newly registered customers i.e in the last 10 seconds
export const sendWelcomeEmail = async () => {
  try {
    const result = await dbUtils.query(
      `SELECT * FROM users WHERE createdAt >= DATEADD(second, -10, GETDATE())`
    );
    if (result.recordset.length > 0) {

      const newUsers = result.recordset as User[];
      newUsers.forEach((user) => {
        const subject = "Welcome to the Overflow";
        const html 
        = `<h1>Welcome to the Overflow</h1>
            <p>Dear ${user.Name},</p>
            <p>Thank you for registering an account with the Overflow.</p>
            <P>We are happy to have you on board and ready to serve you.</P>
            <P>Connect. Learn. Know. Share 🎉🎉</P>
            <p>Regards,<br/>the Overflow Team</p>`;

        sendEmail(subject, user.Email, html);
      });
    }
  } catch (error) {
    console.log(error)
  }
};