import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Definir el esquema para 'Document'
const documentSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  datatang: {
    type: Date,
    required: true,  // Fecha de expiración del documento
  },
  valido: {
    type: Boolean,
    default: true,  // Indica si el documento es válido o no
  },
  operator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operator',  // Relación con el operador (asegúrate de que existe este modelo)
    required: true,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',  // Relación con el trabajo (asegúrate de que existe este modelo)
    required: true,
  }
});

// Crear el modelo basado en el esquema
const Document = mongoose.model('Document', documentSchema);

export {
  Document
}
