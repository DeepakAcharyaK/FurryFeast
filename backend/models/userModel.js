const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Plaease enter a username"]
    },
    email:{
        type:String,
        required:[true, "Please enter a email"]
    },
    password:{
        type:String,
        required:[true, "Plaese enter the password"]
    },
    role:{
        type: String,
        enum: ["admin", "customer"],
        default: "customer",
        required: [true, "Please specify the user role"],
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;