import express from "express";
import { createCart, updateCart, deleteCart, getUserCart, getSingleCart, getAllCart } from "../controllers/cartController.js";
import {verifyTokenAndAuthorization, verifyTokenAndAdmin} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post('/', verifyTokenAndAuthorization, createCart);
router.put('/', verifyTokenAndAuthorization, updateCart);
router.delete('/', verifyTokenAndAuthorization, deleteCart);
router.post('/user/:id', verifyTokenAndAuthorization, getUserCart);
router.post('/single/:id', verifyTokenAndAuthorization, getSingleCart);
router.post('/all', verifyTokenAndAdmin, getAllCart);


export default router;
