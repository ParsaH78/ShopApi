import express from "express";
import { createCart, updateCart, deleteCart, getUserCart, getSingleCart } from "../controllers/cartController.js";

const router = express.Router();

router.post('/', createCart);
router.put('/', updateCart);
router.delete('/', deleteCart);
router.post('/user/:id', getUserCart);
router.post('/single/:id', getSingleCart);


export default router;
