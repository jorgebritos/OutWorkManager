import express from "express"
import cors from "cors"
import { fileURLToPath } from "url" // para obtener las rutas del archivo actual
import { dirname } from "path"
import { config } from "dotenv"
config()
const servidor = express()
servidor.listen(process.env.PORT)
servidor.use(cors())
servidor.use(express.json())
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Archivos estáticos
servidor.use("/",express.static(`${__dirname}/Login_front/spa`)) 
export{
    servidor
}
