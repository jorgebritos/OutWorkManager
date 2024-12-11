import { enviarNotificacion } from '../controller/websocket.js';
const inicio = (req,res)=>{
    enviarNotificacion('socket_id_ejemplo', 'Hola, esta es una notificación');
   res.status(200).redirect("/")
}

export{
    inicio
}