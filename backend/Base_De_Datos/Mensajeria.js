import { bd, mongoose } from "./bd.js"
bd()
// Definir el esquema
// Esquema de Chats
const MensajeriaSchema = new mongoose.Schema({
    usuario1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios'
    },
    usuario2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios'
    },
    usuario_remitente: {
        type: String,
    },
    usuario_destinatario: {
        type: String,
    },
    mensajes: [
        {
            mensaje: {type: String},
            fecha: {type: Date, default: Date.now},
            id_remitente: {type: BigInt}
        }
    ],
    estado: {
        type: String
    }

}, { timestamps: true }); // Agrega createdAt y updatedAt automáticamente

// Crear el modelo
const Mensajeria = mongoose.model('Mensajeria', MensajeriaSchema, "Mensajeria");

export {
    Mensajeria
}
