import mongoose, { Schema, Types, model } from "mongoose";
const SubcategorySchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    slug:{
        type:String,
        require:true,
    },
    image:{
        type:Object,
        require:true
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        require:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        require:true
    },
    UpdatedBy:{
        type:Types.ObjectId,
        ref:'User',
        require:true
    }

},{timestamps:true});
const SubcategoryModel = model('SubCategory',SubcategorySchema);
export default SubcategoryModel ;


