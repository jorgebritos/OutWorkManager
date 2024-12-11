import { Router } from 'express';
import { me } from '../../controllers/AuthController.js';

const router = Router();

router.get('/user', me);

export default router;