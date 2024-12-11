import { Router } from 'express';
import { login } from '../../controllers/AuthController.js';

const router = Router();
router.post('/auth/login', login);

export default router;
