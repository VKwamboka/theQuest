
import express from 'express'
import cron from 'node-cron'
import sendAnswerPreferredEmail from './EmailService/answerpreferred';
import sendWelcomeEmail from './EmailService/welcome';
import { sendForgotPasswordEmail, sendPasswordUpdatedEmail } from './EmailService/forgotPassword';

const app= express()

cron.schedule('*/10 * * * * *', async() => {
  console.log('running a task every 10 Second');
  await sendWelcomeEmail(),
  await sendAnswerPreferredEmail(),
  await sendForgotPasswordEmail(),
  await sendPasswordUpdatedEmail()
});


app.listen(4400, ()=>{
    console.log('App is Running');
    
})