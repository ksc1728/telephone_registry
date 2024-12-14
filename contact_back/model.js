const mongoose=require("mongoose")

const contactSchema = new mongoose.Schema({
    firstName: 
       {type: String, 
        required: true },
    lastName: 
        {type: String, 
        required: true },
    email: 
        {type: String, 
        required: true, 
        unique: true },
    phoneNumber: 
        { type: String, 
        required: true },
    company: String,
    jobTitle: String,
});

module.exports=mongoose.model("contacts", contactSchema);