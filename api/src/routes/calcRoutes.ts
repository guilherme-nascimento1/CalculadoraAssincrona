import { Router } from 'express';
import { createCalculation, getCalculationResult } from '../controllers/calcController';

const router = Router();

router.post('/calc', createCalculation);
router.get('/calc/:id', getCalculationResult);

export default router;
