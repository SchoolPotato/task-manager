const mongoose = require('mongoose');

// So what is a schema?
// const TaskSchema = new mongoose.Schema({
//     name:String,
//     copleted:Boolean
// });

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Must Provide Task Name"],
        trim:true,
        maxlength:[20,'Name Must Be Under 20 Characters']
    },
    completed:{
        type:Boolean,
        default: false
    }
});

// This is basic validation not advanced
module.exports = mongoose.model("Task", TaskSchema);