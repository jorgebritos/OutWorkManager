import { createServer } from 'http'
import { Server } from 'socket.io'
import { emitir_evento,desconectar_evento,escuchar_evento } from "../funciones/ws.js"

const socket_io = (servidor)=>{
    // Crear servidor HTTP
    const httpServer = createServer(servidor)
    // Configurar Socket.IO en el servidor HTTP
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    emitir_evento(io)
    desconectar_evento(io)
    escuchar_evento(io)
  // Iniciar el servidor
  httpServer.listen(servidor.get("puerto"), () => {
    console.log(`Servidor funcionando OK en el puerto ${servidor.get('puerto')}`)
  })
}

export{
    socket_io
}