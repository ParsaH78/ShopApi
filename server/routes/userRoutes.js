import express from "express";
import { updateUser, getUser, getUserOrders } from "../controllers/userController.js";

const router = express.Router();

router.put('/', updateUser);
router.get('/:id', getUser);
router.post('/orders', getUserOrders);

export default router;
