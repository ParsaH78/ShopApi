import express from "express";
import { createProduct, updatedProduct, deleteProduct, getPost, getAllPosts } from "../controllers/productController.js";
import {verifyTokenAndAdmin} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post('/', verifyTokenAndAdmin, createProduct);
router.put('/', verifyTokenAndAdmin, updatedProduct);
router.delete('/', verifyTokenAndAdmin, deleteProduct);
router.get('/find/:id', getPost);
router.get('/all', getAllPosts);

export default router;
