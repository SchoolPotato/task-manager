require('./db/connect');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const { connect } = require('./routes/tasks');
require('dotenv').config();

// middleware
app.use(express.json());
app.use('/api/v1/tasks',tasks);
app.use(express.static('public'));

// routes
// app.get('/',(req, res) => {
//     res.sendFile('index.html');
// });

const port = 5555

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Listening on port ${port}...`));
    } catch(err){console.log(err)}
}

start();