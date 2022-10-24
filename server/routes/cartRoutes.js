import express from "express";
import { createCart, updateCart, deleteCart, getUserCart, getSingleCart, getAllCart } from "../controllers/cartController.js";
import {protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post('/', protect, createCart);
router.put('/', protect, updateCart);
router.delete('/', protect, deleteCart);
router.post('/user/:id', protect, getUserCart);
router.post('/single/:id', protect, getSingleCart);
router.post('/all', protect, getAllCart);


export default router;
