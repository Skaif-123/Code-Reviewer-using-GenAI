const generateContent= require("../services/ai.service");

const getReview = async (req,res) => {
    const codePrompt=req.body.code

    if(!codePrompt){
        return res.status(404).json({
            message:"You need to enter correct prompt",
        })
    }
    else{
       const responseData= await generateContent(codePrompt);
       res.status(200).json({
        message:"Successful",
        data:responseData,
       })
    }
    
}

module.exports=getReview;