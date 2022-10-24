import express from "express";
import { createCart, updateCart, deleteCart, getUserCart, getSingleCart, getAllCart } from "../controllers/cartController.js";

const router = express.Router();

router.post('/', createCart);
router.put('/', updateCart);
router.delete('/', deleteCart);
router.post('/user/:id', getUserCart);
router.post('/single/:id', getSingleCart);
router.post('/all', getAllCart);


export default router;
