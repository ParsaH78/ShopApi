import express from "express";
import { createProduct, updatedProduct } from "../controllers/productController.js";

const router = express.Router();

router.post('/', createProduct);
router.put('/', updatedProduct);

export default router;
