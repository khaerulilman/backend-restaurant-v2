import express from "express";
import categoryRoute from "./categoryRoute.js";
import menuRoute from "./menuRoute.js";
import orderRoute from "./orderRoute.js";

const router = express.Router();

router.use(categoryRoute);
router.use(menuRoute);
router.use(orderRoute);

export default router;
