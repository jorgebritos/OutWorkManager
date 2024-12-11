const jobs = (req,res)=>{
    //res.status(200).redirect("/")
    res.send(req.params.id)
 }
 
 export{
     jobs
 }