import mongoose, { Schema, Types, model } from "mongoose";

const categoryShema = new Schema({
    name:{
        type:String,
        unique:true,
        require:true,
    

    },
    image:{
        type:Object,
        require:true,
    },slug:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
    },
    UpdatedBy:{
        type:Types.ObjectId,
        ref:'User',
    }
},{timestamps:true});
const CategoryModel = model('Category',categoryShema);
export default CategoryModel;