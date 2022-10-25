import express from "express";
import { createProduct, updatedProduct, deleteProduct, getPost, getAllPosts } from "../controllers/productController.js";
import {verifyTokenAndAuthorization} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post('/', verifyTokenAndAuthorization, createProduct);
router.put('/', verifyTokenAndAuthorization, updatedProduct);
router.delete('/', verifyTokenAndAuthorization, deleteProduct);
router.get('/find/:id', verifyTokenAndAuthorization, getPost);
router.get('/all', verifyTokenAndAuthorization, getAllPosts);

export default router;
