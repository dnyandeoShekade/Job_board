// title
// company
// location
// salary
// description
// category

const mongoose = require ("mongoose")

const JobSchema = new  mongoose.Schema({
    title:{
        type :String ,
        required:true,

    },
    company:{
        type:String,
        required:true,

    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
});
module.exports = mongoose.model("job",JobSchema)