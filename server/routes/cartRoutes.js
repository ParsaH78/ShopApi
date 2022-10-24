import express from "express";
import { createCart, updateCart, deleteCart } from "../controllers/cartController.js";

const router = express.Router();

router.post('/', createCart);
router.put('/', updateCart);
router.delete('/', deleteCart);

export default router;
