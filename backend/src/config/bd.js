import { mongoose } from "mongoose"
import dotenv from "dotenv"
const bd = async () => {
    dotenv.config();
    await mongoose.connect(process.env.URL)
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