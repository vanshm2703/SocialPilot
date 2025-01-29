import express from 'express'
const router = express.Router();
import { clientGoogle,clientSignin,clientSignup } from '../controllers/client.auth.controller.js';
import { managerGoogle,managerSignin,managerSignup } from '../controllers/manager.auth.controller.js';

router.post('/clientSignup', clientSignup);
router.post('/managerSignup', managerSignup);
router.post('/managerSignin', managerSignin);
router.post('/clientSignin', clientSignin);
router.post('/managerGoogle', managerGoogle);
router.post('/clientGoogle', clientGoogle);

export default router; 