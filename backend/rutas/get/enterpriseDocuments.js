import { Router } from 'express';
import { index as listEnterpriseDocuments } from '../../controllers/v1/EnterpriseDocumentController.js';

const router = Router();
router.get('/enterprises/:enterpriseSlug/documents', listEnterpriseDocuments);

export default router;
