import express from "express";
import { cerateProduct } from "../controllers/productController.js";

const router = express.Router();

router.post('/', cerateProduct);

export default router;
