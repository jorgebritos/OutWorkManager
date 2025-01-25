import { bd, mongoose } from "../../config/bd.js"
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
