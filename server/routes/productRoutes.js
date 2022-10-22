import express from "express";
import { createProduct, updatedProduct, deleteProduct, getPost, getAllPosts } from "../controllers/productController.js";

const router = express.Router();

router.post('/', createProduct);
router.put('/', updatedProduct);
router.delete('/', deleteProduct);
router.get('/find/:id', getPost);
router.get('/all', getAllPosts);

export default router;
