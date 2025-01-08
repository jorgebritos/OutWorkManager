import express from 'express';
import {
    createJob,
    addDateToJob,
    removeDateFromJob,
    updateDateInJob,
    getJobs,
    getJobById
} from '../../controllers/jobController.js'

const router = express.Router();

// Crear un nuevo trabajo
router.post('/jobs', createJob);

// Agregar una fecha a un trabajo
router.post('/jobs/:jobId/dates', addDateToJob);

// Eliminar una fecha de un trabajo
router.delete('/jobs/:jobId/dates/:dateId', removeDateFromJob);

// Actualizar una fecha de un trabajo
router.put('/jobs/:jobId/dates/:dateId', updateDateInJob);

// Obtener todos los trabajos
router.get('/jobs', getJobs);

// Obtener un trabajo por ID
router.get('/jobs/:jobId', getJobById);

export default router;