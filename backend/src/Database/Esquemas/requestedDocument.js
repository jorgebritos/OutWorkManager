import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const requestedDocumentSchema = new Schema({
  document_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  solicitado_por: {
    type: String,  // Podría ser el nombre del solicitante
    required: true,
  },
  fecha_solicitud: {
    type: Date,
    default: Date.now,  // Fecha en la que se solicitó el documento
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Aprobado', 'Rechazado'],  // Estado del documento solicitado
    default: 'Pendiente',
  },
});

// Crear el modelo basado en el esquema
const RequestedDocument = mongoose.model('RequestedDocument', requestedDocumentSchema);

export {
    RequestedDocument
}
