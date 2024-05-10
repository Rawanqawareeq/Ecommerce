import slugify from 'slugify'
import CategoryModel from "../../model/category.model.js";
import cloudinary from "../utls/cloudinary.js";
export const create = async(req,res)=>{

    req.body.name = req.body.name.toLowerCase();
    if(await CategoryModel.findOne({name:req.body.name})){
        return res.status(409).json({massege:'category already exists'})
    }
    req.body.slug=slugify(req.body.name);
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
    {folder:'Rshop/categories'});
    req.body.image = {secure_url,public_id};
    const category = await CategoryModel.create(req.body); 
   return res.json({massege:category});
}
