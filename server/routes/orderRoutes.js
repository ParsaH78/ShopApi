import express from "express";
import { createOrder, updateOrder, deleteOrder, getAllOrder, getSingleOrder, getUserOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post('/', createOrder);
router.put('/', updateOrder);
router.delete('/', deleteOrder);
router.post('/user/:id', getUserOrder);
router.post('/single/:id', getSingleOrder);
router.post('/all', getAllOrder);

export default router;
