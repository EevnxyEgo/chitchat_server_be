import express from "express";
import {searchUsers} from "../controllers/user.controller.js";
import trimRequest from "trim-request";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getUsers } from "../controllers/user.controller.js";


const router = express.Router();

router.route('/').get(trimRequest.all, authMiddleware, searchUsers);
router.route('/get').get(trimRequest.all, authMiddleware, getUsers);

export default router;