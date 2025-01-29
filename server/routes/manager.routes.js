import { findAllManagers,findManager,deleteManager,updateManager } from "../controllers/manager.auth.controller.js";
import express from 'express'
const router = express.Router();

router.get('/getAllManagers',findAllManagers)
router.get('/findManager',findManager)
router.get('/updateManager',updateManager)
router.delete('/deleteManager',deleteManager)

export default router