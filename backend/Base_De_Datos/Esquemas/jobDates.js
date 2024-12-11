import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Definir el esquema para 'JobDate'
const jobDateSchema = new Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Relación con el modelo 'Job'
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  hora_entrada: {
    type: String,
    required: true,
  },
  hora_salida: {
    type: String,
    required: true,
  },
});

// Crear el modelo basado en el esquema
const JobDate = mongoose.model('JobDate', jobDateSchema);

export {
    JobDate
}
