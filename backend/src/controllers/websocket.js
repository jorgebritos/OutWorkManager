// controladores/websocket.js

import { emitirEventoATodos, emitirEventoACliente } from '../../funciones/ws.js';

// Manejar un evento recibido
const  manejarMensaje = (socket, data) =>{
    console.log(`Mensaje recibido del cliente ${socket.id}: ${data}`);
    
    // Emitir una respuesta a todos los clientes
    emitirEventoATodos('mensajeGlobal', `Cliente ${socket.id} dijo: ${data}`);
}

// Emitir un evento desde un controlador (ejemplo independiente)
const  enviarNotificacion = (socketId, mensaje) => {
    emitirEventoACliente(socketId, 'notificacion', mensaje);
}

export {
    manejarMensaje,
    enviarNotificacion,
};
