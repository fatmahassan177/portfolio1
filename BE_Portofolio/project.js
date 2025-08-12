const express=require('express')
const mongoose=require('mongoose');
const router=express.Router()
const upload=require('./config');
const fs = require('fs');
const path = require('path');



mongoose.connect('mongodb://localhost:27017/portfolio')

const ProjectSchema=new mongoose.Schema({

    img:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
    },
    link:{
        type: String,
    required: true,
    match: /^https?:\/\/[^\s$.?#].[^\s]*$/gm
    },
})

const Project = mongoose.model('Project',ProjectSchema);
Project.syncIndexes().then(_=>console.log("index Project"))


router.post('/',upload.single("img"),async(req,res)=>{
    const {title,description,link}=req.body
    const img=req.file.filename
    const project =new Project({img,title,description,link})
    res.json(await project.save())
})

router.get('/' ,async (req,res)=>{
    const project=await Project.find()
        res.json(project) }
    )


router.delete('/:id',async(req,res)=>{
    const id=req.params.id
    const project=await Project.findByIdAndDelete(id)
  //  fs.unlinkSync(path.join(__dirname, 'img', project.img));
    res.json(project)
})

 router.put('/:id',upload.single('img'),async(req,res)=>{
//      const{name,title}=req.body;
//       const { id } = req.params;
//      const newimg = req.file.filename;
//    //const oldProject = await Project.findById(id);

//     // fs.unlinkSync(path.join(__dirname, 'img', oldProject.img));
//     const project=await Project.findByIdAndUpdate(id,{name,img:newimg,title},{new:true})

//     res.json(project)

const id = req.params.id;
const { title, description, link } = req.body;

const updateData = { title, description, link };

if (req.file) {
  updateData.img = req.file.filename;
}

const project = await Project.findByIdAndUpdate(id, updateData, { new: true });

res.json(project);




    
})





module.exports=router