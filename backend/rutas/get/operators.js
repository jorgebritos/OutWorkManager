import { Router } from 'express';
import { index as listOperators } from '../../controllers/v1/OperatorController.js';

const router = Router();
router.get('/enterprises/:enterpriseSlug/operators', listOperators);

export default router;
