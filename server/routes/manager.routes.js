import express from "express";
import { findAllManagers, findManager, deleteManager, updateManager } from "../controllers/manager.auth.controller.js";
import { getRequestsByManagerId, approveRequest } from "../controllers/request.controller.js";

const router = express.Router();

router.get("/getAllManagers", findAllManagers);
router.get("/findManager", findManager);
router.get("/updateManager", updateManager);
router.delete("/deleteManager", deleteManager);
router.get("/getRequestsByManagerId", getRequestsByManagerId);
router.post("/approveRequest/:requestId", approveRequest);


export default router;
