import express from "express";
import { updateUser, getUser, getUserOrders } from "../controllers/userController.js";
import {verifyTokenAndAuthorization} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.put('/', verifyTokenAndAuthorization, updateUser);
router.get('/:id', verifyTokenAndAuthorization, getUser);
router.post('/orders', verifyTokenAndAuthorization, getUserOrders);

export default router;
