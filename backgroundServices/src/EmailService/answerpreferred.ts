import ejs from "ejs";
import { sendEmail } from "../helpers/email";
import mssql, { IProcedureResult } from "mssql";
import { sqlConfig } from "../config";
import { User } from "../interface/user";
import { Question } from "../interface/question";
import { Answer } from "../interface/answer";

const sendAnswerPreferredEmail = async () => {
  const pool = await mssql.connect(sqlConfig);

  const users: User[] = await (
    await pool.request().execute("getPreferredAnswerUserDetails")
  ).recordset;

//   let answer: Answer = await (
//     await pool.request().execute("getPreferredAnswerUserDetails")
//   ).recordset[0];

 
  const preferredAnswers: Answer[] = await (
    await pool.request().execute("getPreferredAnswersToSendEmailFor")
  ).recordset;

  for (let answer of preferredAnswers) {
    console.log(answer)

    for (let user of users) {
      ejs.renderFile(
        "template/answerMarkedPreferred.ejs",
        { name: user.Name },
        async (error, html) => {
          const message = {
            from: process.env.SMTP_USER_EMAIL,
            to: user.Email,
            subject: "Your answer has been marked as preferred",
            html,
          };

          try {
            await sendEmail(message);
            await pool
              .request()
              .query(
                
                `UPDATE answers SET isSent = 1 WHERE answer_id = '${answer.answer_id}'`
              );
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  }
};

export default sendAnswerPreferredEmail;
