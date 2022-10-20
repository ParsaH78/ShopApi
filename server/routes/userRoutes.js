import express from "express";
import { updateUser, getUser } from "../controllers/userController.js";

const router = express.Router();

router.put('/', updateUser);
router.get('/:id', getUser);

export default router;
