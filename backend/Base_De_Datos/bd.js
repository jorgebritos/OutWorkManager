import { mongoose } from "mongoose"
const bd = async()=>{
   await mongoose.connect(process.env.url)
    .then(() => {
        console.log("Conexión exitosa a MongoDB Atlas")
    })
    .catch((err) => {
        console.error("Error al conectar a MongoDB Atlas:", err)
    })
}

export {
    bd,
    mongoose
}