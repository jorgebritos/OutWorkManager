import { bd ,mongoose } from "./bd.js"
bd()
// Definir el esquema
const MensajeriaSchema = new mongoose.Schema({
    remitente:{
        type: mongoose.Schema.Types.ObjectId
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId
    },
    usuario_remitente:{
        type: String,
    },
    usuario_destinatario:{
        type: String,
    },
    mensaje: {
        type: Array,
    },
   
}, { timestamps: true }); // Agrega createdAt y updatedAt automáticamente

// Crear el modelo
const Mensajeria = mongoose.model('Mensajeria', MensajeriaSchema,"Mensajeria");

export { 
    Mensajeria
}
