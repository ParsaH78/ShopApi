import express from "express";
import { createOrder, updateOrder, deleteOrder, getAllOrder, getSingleOrder, getUserOrder } from "../controllers/orderController.js";
import {verifyTokenAndAuthorization} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post('/', verifyTokenAndAuthorization, createOrder);
router.put('/', verifyTokenAndAuthorization, updateOrder);
router.delete('/', verifyTokenAndAuthorization, deleteOrder);
router.post('/user/:id', verifyTokenAndAuthorization, getUserOrder);
router.post('/single/:id', verifyTokenAndAuthorization, getSingleOrder);
router.post('/all', verifyTokenAndAuthorization, getAllOrder);

export default router;
