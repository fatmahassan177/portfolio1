const multer = require("multer");

const storage=multer.diskStorage({
    destination:(req,file,CB)=>{
        CB(null,'img')
    },
    filename:(req,file,CB)=>{
        CB(null,Date.now()+"_",file.originalname);
    }

})
const upload=multer({storage})
module.exports=upload