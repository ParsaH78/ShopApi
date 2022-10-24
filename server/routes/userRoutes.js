import express from "express";
import { updateUser, getUser, getUserOrders } from "../controllers/userController.js";
import {protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.put('/', protect, updateUser);
router.get('/:id', protect, getUser);
router.post('/orders', protect, getUserOrders);

export default router;
