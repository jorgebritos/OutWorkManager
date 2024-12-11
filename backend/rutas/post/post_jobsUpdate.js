import { Router } from 'express';
import { store } from '../../controllers/v1/JobController.js';

const router = Router();
router.post('/admin/jobs/update', store);

export default router;
