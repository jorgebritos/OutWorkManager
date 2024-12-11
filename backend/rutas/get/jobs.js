import { Router } from 'express';
import { show } from '../../controller/JobsController.js';

const jobs_show = (req,res)=>{
   
   res.status(200).redirect("/")
}


export {
    jobs_show
}
