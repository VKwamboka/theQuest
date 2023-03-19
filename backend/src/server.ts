import express, { json } from 'express'
// import router from './Router'
import userRoutes from './router/userRoutes'
import cors from 'cors'
import { sendWelcomeEmail } from './emails/welcomeemail'
import cron from "node-cron";
import questionRoutes from './router/questionRouter'
import answerRoutes from './router/answerRouter';
import commentRouter from './router/commentRouter';
import voteRouter from './router/voteRouter';


const app= express()

//Register some Middlewares
app.use(cors())
app.use(json()) //adds a body to the Request

//Register Routes
app.use('/auth',userRoutes)
// quiz ROutes
app.use('/question', questionRoutes)
// answer Routes
app.use('/answer', answerRoutes)
// Comment Routes
app.use('/comment', commentRouter)
// Vote Routes
app.use('/vote', voteRouter)



app.listen(3001, () => {
    console.log('Server is running on port 3000')
})


app.listen(4002,()=>{
console.log("Running hee...");

})

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});


// send welcome email to newly registered users
cron.schedule("*/10 * * * * *", async () => {
  await sendWelcomeEmail();
  // console.log("Welcome email running");
});