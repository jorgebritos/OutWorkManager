import { servidor } from "./config.js"
import { inicio } from "./rutas/get/inicio.js"
import { post_registro } from "./rutas/post/post_registro.js"
import { validar_datos } from "./middlewares/Funciones_Registro.js"
import { jobs_show } from "./rutas/get/jobs.js"
// Rutas GET
servidor.get("/",inicio)
servidor.get("/jobs/:id", jobs_show)
// Rutas POST
servidor.post("/registro", validar_datos , post_registro)
