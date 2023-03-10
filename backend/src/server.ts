import express, { json } from 'express'
// import router from './Router'
import userRoutes from './router/userRoutes'
import cors from 'cors'
import { sendWelcomeEmail } from './emails/welcomeemail'
import cron from "node-cron";


const app= express()

//Register some Middlewares
app.use(cors())
app.use(json()) //adds a body to the Request

//Register Routes
app.use('/auth',userRoutes)


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