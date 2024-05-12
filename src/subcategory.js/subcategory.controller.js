import slugify from 'slugify'
import CategoryModel from "../../model/category.model.js";
import cloudinary from "../utls/cloudinary.js";
import SubcategoryModel from '../../model/subcategory.model.js';
export const create = async(req,res)=>{
    const {id} = req.params;
     const category = await CategoryModel.findById(id);
     if(!category){
        return res.status(409).json({massege:'category not exists'});
     }
    req.body.name = req.body.name.toLowerCase();
    if(await SubcategoryModel.findOne({name:req.body.name})){
        return res.status(409).json({massege:'category already exists'});
    }
    req.body.slug=slugify(req.body.name);

    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
    {folder:`${process.env.APPNAME}/subcategories`});
    req.body.image = {secure_url,public_id};
    req.body.createdBy = req.user._id;
    req.body.UpdatedBy = req.user._id;
    req.body.categoryId = id;
    const subcategory = await SubcategoryModel.create(req.body); 
   return res.json({massege:"success",subcategory:subcategory});
}
export const getAll = async(req,res)=>{
    const category = await CategoryModel.find({});
    return res.status(200).json({massege:"sueccess",category});
}
export const getActive = async(req,res)=>{
    const category = await CategoryModel.find({status:'Active'}).select("name");
    return res.status(200).json({massege:"sueccess",category});
}
export const getDetails = async(req,res)=>{
    const category = await CategoryModel.findById(req.params.id);
    return res.status(200).json({massege:"sueccess",category});

}
export const update = async(req,res)=>{
    const category = await CategoryModel.findById(req.params.id);
    if(!category){
        return res.status(404).json({massege:"category not found"});
    }
    category.name = req.body.name.toLowerCase();
    if(await CategoryModel.findOne({name:category.name,_id:{$ne:req.params.id}})){
        return res.status(404).json({massege:"name aleardy exist"});
    }
    category.slug = slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
               folder :'Rshop/categories'
        })
        cloudinary.uploader.destroy( category.image.public_id)
    category.image ={secure_url,public_id}
    }
    
    category.status = req.body.status;
    req.body.UpdatedBy = req.user._id;
    
    category.save();
    return res.status(200).json({massege:"sueccess",category});
}
export const destroy = async(req,res)=>{
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if(!category){
        return res.status(404).json({massege:"category not found"});
    }
    await cloudinary.uploader.destroy( category.image.public_id );
    return res.status(200).json({massege:"success",category});
    
}
    
