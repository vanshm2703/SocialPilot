import express from 'express'
const router = express.Router();
import { clientSignin,clientSignup } from '../controllers/client.auth.controller.js';
import { managerSignin,managerSignup } from '../controllers/manager.auth.controller.js';

router.post('/clientSignup', clientSignup);
router.post('/managerSignup', managerSignup);
router.post('/managerSignin', managerSignin);
router.post('/clientSignin', clientSignin);

export default router; 