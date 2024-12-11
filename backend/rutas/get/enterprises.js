import { Router } from 'express';
import { getDocuments } from '../../controllers/v1/EnterpriseController.js';

const router = Router();
router.get('/enterprises/:id/documents', getDocuments);

export default router;
