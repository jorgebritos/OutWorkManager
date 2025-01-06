// funciones/ws.js

let io = null;

// Configura el objeto io (socket.io)
const configurarSocket = (ioInstance) => {
    io = ioInstance;
}

// Emitir evento a un cliente específico
const emitirEventoACliente = (socketId, evento, data) => {
    if (io) {
        io.to(socketId).emit(evento, data);
    } else {
        console.error("Socket.io no está configurado");
    }
}

// Emitir evento a todos los clientes
const emitirEventoATodos = (evento, data)=> {
    if (io) {
        io.emit(evento, data);
    } else {
        console.error("Socket.io no está configurado");
    }
}

// Exportar funciones
export{
    configurarSocket,
    emitirEventoACliente,
    emitirEventoATodos,
};