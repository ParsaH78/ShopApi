import express from "express";
import { createProduct, updatedProduct, deleteProduct, getPost, getAllPosts } from "../controllers/productController.js";
import {protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post('/', protect, createProduct);
router.put('/', protect, updatedProduct);
router.delete('/', protect, deleteProduct);
router.get('/find/:id', protect, getPost);
router.get('/all', protect, getAllPosts);

export default router;
