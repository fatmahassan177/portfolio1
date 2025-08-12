const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/portfolio')

const AboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    t_description: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10,
         trim:true
    },
    education: {
        type: String,
        required: true,
    },
    edu_description: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10,
         trim:true
    },
    intersted: {
        type: String,
        required: true
    },
    int_description: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10,
         trim:true
    }
});

router.post('/',async(req,res)=>{
    const {title,t_description,education,edu_description,intersted,int_description}=req.body
    const about=new About({title,t_description,education,edu_description,intersted,int_description})
    res.json(await about.save())
})

router.get('/',async(req,res)=>{
    const about=await About.find()
    res.json(about)
})

router.put('/:id',async(req,res)=>{
    const {title,t_description,education,edu_description,intersted,int_description}=req.body
    const { id } = req.params;

const about=await About.findByIdAndUpdate(id,{title,t_description,education,edu_description,intersted,int_description},{new:true})
    res.json( about)
})

router.delete('/:id',async(req,res)=>{
    const id=req.params.id
    const about=await About.findByIdAndDelete(id)
    res.json(about)
})

const About = mongoose.model("About", AboutSchema);
About.syncIndexes().then(_ => console.log("index About"));

module.exports = router;
