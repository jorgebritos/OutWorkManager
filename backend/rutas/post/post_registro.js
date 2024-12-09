import { Usuarios } from "../../Base_De_Datos/Usuarios.js"
import  bcryptjs from "bcryptjs"

const encriptar_contra =(contra)=>{
    const llave = process.env.llave 
    const vueltas = bcryptjs.genSaltSync(11)
    const contra_con_llave = contra + llave
    const contraEncriptada = bcryptjs.hashSync(contra_con_llave, vueltas)

    return contraEncriptada
}

const post_registro = async(req,res)=>{
    const datos = req.body
    let { usuario, contra, correo } = datos
    
    const existeCorreo = await Usuarios.findOne({ correo })
    if(!existeCorreo){
        contra = encriptar_contra(contra)
        const datos = {
            usuario,
            contra,
            correo,
            rol:"usuario",
           
        }
        const agregar_usuario = new Usuarios(datos)
        agregar_usuario.save()
        res.status(200).json({mensaje:"usuario guardado"})
    }
    else{
        res.status(400).json({ msg: "Correo ya existe" }) 
    } 
    
    
}

export{
    post_registro
}