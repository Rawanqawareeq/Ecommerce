import { Router } from "express"
import fileUpload, { flieTypes } from "../utls/multer.js"
import * as CategoryController from "./category.controller.js"
import {auth} from '../middleware/auth.js'
import subcategoryRouter from "../subcategory.js/subcategory.router.js"
const router = Router({caseSensitive:true});
router.use('/:id/subcategory',subcategoryRouter)
router.post('/',auth(['Admin']),fileUpload(flieTypes.image).single('image'),CategoryController.create);
router.get('/',auth(['Admin']),CategoryController.getAll)
router.get('/Active',CategoryController.getActive)
router.get('/:id',CategoryController.getDetails)
router.patch('/:id',auth(['Admin']),CategoryController.getDetails)
router.delete('/:id',auth(['Admin']),CategoryController.destroy);

export default router;