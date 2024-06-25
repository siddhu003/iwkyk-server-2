import express from 'express'   
//const express =require('express')
import cors from 'cors'
import mongoose from 'mongoose'

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'

import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is a Stack Overflow clone API")
})

app.use('/user', userRoutes)
// app.use('/forgot-password',userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

    try {
        const oldUser = await users.findOne({ email });

        if (!oldUser)
        {
            return res.status(404).json({message:"User doesn't exist."})
        }

        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.login({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m' });

        // const link = `https://stack-overflow.herokuapp.com/reset-password/${oldUser._id}/${token}`;
        // console.log(link)

    } catch (error) {
        res.status(500).json("Something went wrong.....")
    }
})

const PORT = process.env.PORT || 5000

//const DATABASE_URL = process.env.CONNECTION_URL
// const DATABASE_URL = "mongodb+srv://siddharth:03032003Sa!@stackoverflowclone.tebpkpo.mongodb.net/?retryWrites=true&w=majority"

//IWKYK
const DATABASE_URL

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`) }))
.catch((err) => console.log(err.message))
