const mongoose = require('mongoose');

const connectionString = "mongodb+srv://TruPotato:TPkKviqpwBsn9lft@task-manager-practice.2lkb4.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority"

const connectDB = (url) => {
    mongoose
    .connect(url)
    .then(()=>{console.log('CONNECTED')})
    .catch((err) => {console.error(err)});
}

module.exports = connectDB;