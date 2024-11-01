
// the express server app
import express from "express"

// import mongoose and student schema
import mongoose from "mongoose"
import { Student } from './models/Student.js'

// import 
// body parser : to read the request object's body
// cors : cross origin resource sharing, allows webpage to access restricted resources from a server on a domain different than domain that served the web page
import bodyParser from 'body-parser'
import cors from 'cors'

// create the connection betweem express and db using connection string
const connStr = 'mongodb://localhost:27017/Susmit_University'
async function connectDB() {
    try {
        await mongoose.connect(connStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if DB connection fails
    }
}
connectDB();
const app = express()
const port = 3000

// use the cors and bodyParser middlware
// we use cors, to use the front end resources in the backend without errors
// cors: cross origin resource sharing
app.use(cors({
    origin: 'http://localhost:5173', // Adjust to match your React app's port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Backend Server')
})

// make a post request and read the request body from the 3000 endpoint
app.post('/', async (req, res) => {

    console.log("Request received:", req.body);

    // we get the data from the frontend in req.body, we have used body-parser middleware to parse the body
    // we have to create an object of Student schema, and save it to database

    try {
        const {
            name, age, gender, address,
            score12th, score10th, dept
        } = req.body;

        // Ensure all required fields are present
        if (!name || !age || !gender || !address ||
            !score12th || !score10th || !dept) {
            return res.status(400).send('Missing required fields');
        }

        const newStudent = new Student({
            name,
            age: Number(age),
            gender,
            address,
            score12th: Number(score12th),
            score10th: Number(score10th),
            dept
        });

        const savedStudent = await newStudent.save();
        console.log("Student saved successfully:", savedStudent);

        res.status(201).json({
            message: 'New Student saved Successfully',
            student: savedStudent
        });
    } catch (error) {
        res.status(400).send('Error Saving the new Student ', error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})