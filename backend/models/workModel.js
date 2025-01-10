const mongoose = require('mongoose');

const workSchema = mongoose.Schema({
    taskname:{
        type:String,
        required:[true, "Plaease enter a taskname"]
    },
    volunteer:{
        type:Number,
        required:[true, "Please enter a number of volunteer"]
    },
    deadline:{
        type:Date,
        default:Date.now,
        required:[true, "Plaese enter the deadline data"]
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
})

const Work = mongoose.model('Work', workSchema);

module.exports = Work;