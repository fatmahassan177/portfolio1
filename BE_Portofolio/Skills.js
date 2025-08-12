const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
mongoose.connect('mongodb://localhost:27017/portfolio')

const SkillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },

  icon: {
    type: String, 
    required: true
    },
})        
const Skills = mongoose.model("Skills", SkillsSchema);
Skills.syncIndexes().then(_ => console.log("index Skills"));

router.post('/',async(req,res)=>{
    const {name,percentage,icon}=req.body
    const skills=new Skills({name,percentage,icon})
    res.json(await skills.save())
})

router.get('/',async(req,res)=>{
    const skills=await Skills.find()
    res.json(skills)
})

router.put('/:id',async(req,res)=>{
    const {name,percentage,icon}=req.body
    const { id } = req.params;
const skills=await Skills.findByIdAndUpdate(id, {name,percentage,icon},{new:true})
    res.json( skills)
})

router.delete('/:id',async(req,res)=>{
    const id=req.params.id
    const skills=await Skills.findByIdAndDelete(id)
    res.json(skills)
})



module.exports = router;

