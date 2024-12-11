import { emitir_evento } from "../../funciones/ws.js"
const inicio = (req,res)=>{
   res.status(200).redirect("/")
}

export{
    inicio
}