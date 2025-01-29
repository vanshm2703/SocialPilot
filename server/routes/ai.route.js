import express from 'express'
import { generateSocialMediaContent } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/', generateSocialMediaContent);

export default router; 