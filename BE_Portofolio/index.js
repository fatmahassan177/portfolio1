const express=require('express')
const mongoose=require('mongoose');
const cors = require('cors');

const app=express()
const port=3000

app.use(express.json());
app.use(cors());

const ContactRouter=require('./contact')
const IntrotRouter =require('./intro')
const AboutRouter=require('./about')
const ProjectRouter=require('./project')
const SkillsRouter=require('./Skills')
app.use('/skills',SkillsRouter)
app.use('/project',ProjectRouter)
app.use('/contact',ContactRouter)
app.use('/intro',IntrotRouter)
app.use('/about',AboutRouter)
app.use('/image',express.static('./img'))

app.listen(port,()=>{ 
    console.log(`server started ${port}`)
}) 