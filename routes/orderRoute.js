import express from "express";
import OrderController from "../controller/orderController.js";

const router = express.Router();

router.post("/order", OrderController.create);

export default router;
