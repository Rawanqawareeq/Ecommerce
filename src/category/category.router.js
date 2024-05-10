import { Router } from "express";
import fileUpload, { flieTypes } from "../utls/multer.js";
import * as CategoryController from "./category.controller.js";

const router = Router({caseSensitive:true});
router.post('/',fileUpload(flieTypes.image).single('image'),CategoryController.create);
export default router;