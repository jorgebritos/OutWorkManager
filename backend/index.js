import { servidor } from "./config.js"
import { inicio } from "./rutas/get/inicio.js"
import { post_registro } from "./rutas/post/post_registro.js"

// Rutas GET
servidor.get("/", inicio)

// Rutas POST
servidor.post("/registro" , post_registro)
