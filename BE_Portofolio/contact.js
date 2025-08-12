const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/portfolio')

const ContactSchema=new mongoose.Schema({
    FirstName:{ 
        type:String,
        required:true,
        minlength:3,
    maxlength:15,
    trim:true
    },
    LastName:{ 
        type:String,
        required:true,
        minlength:3,
    maxlength:15,
    trim:true
    },
    email:{
    type:String,
    match:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    required:true,
    lowercase:true,
},
message: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10,
         trim:true
    }

})
const Contact =mongoose.model('Contact',ContactSchema)
Contact.syncIndexes().then(_=>(console.log("index contact")))

router.post('/',async(req,res)=>{
    const {FirstName,LastName,email,message}=req.body
    const contact=new Contact({FirstName,LastName,email,message})
    res.json(await contact.save())
})



router.get('/',async(req,res)=>{
    const contact=await Contact.find()
    res.json(contact)
})

router.put('/',async(req,res)=>{
    const {id,FirstName,LastName,email,message} =req.body
    const contact=await Contact.findByIdAndUpdate(id,{FirstName,LastName,email,message},{new:true})
    res.json(contact)
})

router.delete('/:id',async(req,res)=>{
    const id =req.params.id
    const contact=await Contact.findByIdAndDelete(id)
    res.json(contact)
})

module.exports=router