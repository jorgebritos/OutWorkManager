import { servidor } from "./config.js"
import { inicio } from "./rutas/get/inicio.js"
import { post_registro } from "./rutas/post/post_registro.js"
import { validar_datos } from "./middlewares/Funciones_Registro.js"
import { jobs } from "./rutas/get/jobs.js"
// Rutas GET
servidor.get("/",inicio)
servidor.get("/jobs/:id", jobs)
// Rutas POST
servidor.post("/registro", validar_datos , post_registro)
