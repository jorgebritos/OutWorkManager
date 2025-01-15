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
router.post('/', createJob);

// Agregar una fecha a un trabajo
router.post('/:jobId/dates', addDateToJob);

// Eliminar una fecha de un trabajo
router.delete('/:jobId/dates/:dateId', removeDateFromJob);

// Actualizar una fecha de un trabajo
router.put('/:jobId/dates/:dateId', updateDateInJob);

// Obtener todos los trabajos
router.get('/', getJobs);

// Obtener un trabajo por ID
router.get('/jobs/:jobId', getJobById);

export default router;