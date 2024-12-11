import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Definir el esquema para 'Job'
const jobSchema = new Schema({
  trabajo: {
    type: String,
    required: true,
  },
  enterprise_id: {
    type: Number,
    required: true,
  },
  confirmacion_prevencionista: {
    type: Boolean,
    default: null,
  },
  confirmacion_empresa: {
    type: Boolean,
    default: null,
  },
});

// Crear el modelo basado en el esquema
const Job = mongoose.model('Job', jobSchema);

export { 
    Job
}
