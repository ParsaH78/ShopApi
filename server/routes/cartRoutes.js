import express from "express";
import { createCart, updateCart } from "../controllers/cartController.js";

const router = express.Router();

router.post('/', createCart);
router.put('/', updateCart);

export default router;
