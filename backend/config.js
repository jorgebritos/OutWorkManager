import express from "express" // importamos el modulo de express para crear el servidor
import cors from "cors" // importamos el modulo de cors para recibir peticiones desde otro destino
import { fileURLToPath } from "url" // para obtener las rutas del archivo actual
import { dirname } from "path" // para obtener las rutas del directorio actual
import { config } from "dotenv" // importamos dotenv para las variables de entorno
import { configurarSocket } from './funciones/ws.js';
import { Server } from 'socket.io';
import http from 'http';
import { manejarMensaje } from './controller/websocket.js';
//-----------------------------------------------------------------------------------
config() // ejecutamos config
const servidor = express() // ejecutamos la configuración de express
servidor.listen(process.env.PORT) // El servidor va a estar escuchando en el puerto , en este caso la variable de entorno PORT
const __filename = fileURLToPath(import.meta.url)// para obtener las rutas del archivo actual
const __dirname = dirname(__filename) // para obtener las rutas del directorio actual

//------------Middleware--------------------------------------
servidor.use(cors()) // Usamos como middleware la funcion de cors
servidor.use(express.json()) // Usamos como middleware la funcion de express json para que interprete los datos que vienen como json


servidor.use("/",express.static(`${__dirname}/Login_front/spa`)) // Archivos estáticos " Los que se envían al usuario " 
const server = http.createServer(servidor);
const io = new Server(server);

// Configura socket.io en funciones
configurarSocket(io);
// Manejar conexiones de clientes
io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // Escuchar evento 'mensaje'
    socket.on('mensaje', (data) => manejarMensaje(socket, data));

    // Manejar desconexión
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});


export{
    servidor // exportamos la variable del servidor
}
