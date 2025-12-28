import express from "express";
import MenuController from "../controller/menuController.js";

const router = express.Router();

router.post("/menus", MenuController.uploadImage, MenuController.create);
router.get("/menus", MenuController.getAll);

export default router;
