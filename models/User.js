const mongoose = require ("mongoose");

// user data structre
const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        default:"user",

    },
});
module.exports = mongoose.model("user",userSchema);

// {
//   "name": "Dnyandeo",
//   "email": "test@gmail.com",
//   "password": "123456",
//   "role": "user"
//  }