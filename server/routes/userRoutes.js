import express from "express";
import { updateUser, getUser } from "../controllers/userController.js";
import {verifyTokenAndAuthorization} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.put('/', verifyTokenAndAuthorization, updateUser);
router.get('/:id', getUser);

export default router;
