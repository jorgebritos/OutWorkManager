import { Usuarios } from "../../Base_De_Datos/Usuarios.js"

const post_registro = async(req,res)=>{
    const { usuario, contra, correo } = req.body
    const existeCorreo = await Usuarios.findOne({ correo })
    if(!existeCorreo){
        const datos = {
            usuario,
            contra,
            correo,
            rol:"usuario",
        }
        const agregar_usuario = new Usuarios(datos)
        agregar_usuario.save()
        res.status(200).send("usuario guardado")
    }
    else{
        res.status(400).json({ msg: "Correo ya existe" }) 
    } 
    
    
}

export{
    post_registro
}