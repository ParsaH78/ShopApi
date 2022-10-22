import express from "express";
import { createProduct, updatedProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.post('/', createProduct);
router.put('/', updatedProduct);
router.delete('/', deleteProduct);

export default router;
