import express from 'express';

const router = express.Router()

router.get("/test", (req,res)=>{
   console.log("it works!");
    
})

export default router;