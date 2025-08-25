const express=require("express");
const aiController=require("../controller/ai.controllers");
const router=express.Router();

router.post("/get-review",aiController);
module.exports=router;