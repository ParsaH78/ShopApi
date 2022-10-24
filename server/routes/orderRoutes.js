import express from "express";
import { createOrder, updateOrder, deleteOrder, getAllOrder, getSingleOrder, getUserOrder } from "../controllers/orderController.js";
import {protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post('/', protect, createOrder);
router.put('/', protect, updateOrder);
router.delete('/', protect, deleteOrder);
router.post('/user/:id', protect, getUserOrder);
router.post('/single/:id', protect, getSingleOrder);
router.post('/all', protect, getAllOrder);

export default router;
