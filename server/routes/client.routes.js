import express from 'express'
const router = express.Router();
import { createRequest , getRequestsByClientId} from '../controllers/request.controller.js';
router.post('/createRequest', createRequest);
router.get('/getRequestsByClientId/:clientId', getRequestsByClientId);

export default router