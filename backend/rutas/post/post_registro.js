import { Usuario } from "../../Base_De_Datos/bd_Registro.js"
const post_registro = (req,res)=>{
    const { usuario, contra, correo } = req.body
    const datos = {
        usuario,
        contra,
        correo
    }
    const agregar_usuario = new Usuario(datos)
    agregar_usuario.save()
    res.send("usuario guardado")
}

export{
    post_registro
}