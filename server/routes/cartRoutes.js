import express from "express";
import { createCart, updateCart, deleteCart, getUserCart } from "../controllers/cartController.js";

const router = express.Router();

router.post('/', createCart);
router.put('/', updateCart);
router.delete('/', deleteCart);
router.post('/user/:id', getUserCart);


export default router;
