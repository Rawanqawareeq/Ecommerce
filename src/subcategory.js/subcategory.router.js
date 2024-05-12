import { Router } from "express"
import fileUpload, { flieTypes } from "../utls/multer.js"
import * as subCategoryController from "./subcategory.controller.js"
import {auth} from '../middleware/auth.js'
const router = Router({mergeParams:true});
router.post('/',auth(),fileUpload(flieTypes.image).single('image'),subCategoryController.create);
router.get('/',auth(),subCategoryController.getAll)
router.get('/Active',subCategoryController.getActive)
router.get('/:id',subCategoryController.getDetails)
router.patch('/:id',auth(),subCategoryController.getDetails)
router.delete('/:id',auth(),subCategoryController.destroy);

export default router;