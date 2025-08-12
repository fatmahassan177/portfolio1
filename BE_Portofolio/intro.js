const express=require('express')
const mongoose=require('mongoose');
const router=express.Router()
const upload=require('./config');
const fs = require('fs');
const path = require('path');


mongoose.connect('mongodb://localhost:27017/portfolio')
const IntroSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }

})
const Intro = mongoose.model('Intro',IntroSchema);
Intro.syncIndexes().then(_=>console.log("index intro"))

router.get('/' ,async (req,res)=>{
    const intro=await Intro.find()
        res.json(intro) }
    )

router.post('/',upload.single('img'),async(req,res)=>{
     const { name, title } = req.body;
    const img = req.file.filename; 
    const myintro=new Intro({name,img,title});  
    res.json(await myintro.save());
})


router.put('/:id',upload.single('img'),async(req,res)=>{
//     const id = req.params.id;
//      const{name,title}=req.body;
//      const newimg = req.file.filename;
//     // const oldProject = await Project.findById(id);
//    // fs.unlinkSync(path.join(__dirname, 'img', oldProject.img));
//     const updateData = { name, title };

//    if (req.file) {
//       updateData.img = req.file.filename;
//     }
//     const intro=await Intro.findByIdAndUpdate(id,{name,img:newimg,title},{new:true})
//     res.json(intro)
 const id = req.params.id;
    const { name, title } = req.body;

    
    const updateData = { name, title };

   
    if (req.file) {
      updateData.img = req.file.filename;
    }

    const intro = await Intro.findByIdAndUpdate(id, updateData, { new: true });

    res.json(intro);
})

router.delete('/:id',async(req,res)=>{
    const id=req.params.id
    const intro=await Intro.findByIdAndDelete(id)
     //fs.unlinkSync(path.join(__dirname, 'img', project.img));
    res.json(intro)

})

module.exports=router
