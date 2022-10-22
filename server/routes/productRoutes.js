import express from "express";
import { createProduct, updatedProduct, deleteProduct, getPost } from "../controllers/productController.js";

const router = express.Router();

router.post('/', createProduct);
router.put('/', updatedProduct);
router.delete('/', deleteProduct);
router.get('/:id', getPost);

export default router;
