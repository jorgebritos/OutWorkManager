import { servidor } from "./config.js"
import { inicio } from "./rutas/get/inicio.js"
import { post_registro } from "./rutas/post/post_registro.js"
import { validar_datos } from "./middlewares/Funciones_Registro.js"

// Rutas GET
servidor.get("/",inicio)

// Rutas POST
servidor.post("/registro", validar_datos , post_registro)
