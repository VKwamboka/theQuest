
import express from 'express'
import cron from 'node-cron'
import sendWelcomeEmail from './EmailService/welcome';

const app= express()

cron.schedule('*/10 * * * * *', async() => {
  console.log('running a task every 10 Second');
  await sendWelcomeEmail()
});


app.listen(4000, ()=>{
    console.log('App is Running');
    
})