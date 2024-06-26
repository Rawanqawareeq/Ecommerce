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
        require:true
    },
    UpdatedBy:{
        type:Types.ObjectId,
        ref:'User',
        require:true
    }
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
categoryShema.virtual('subcategory',{
    localField:'_id',
    foreignField:'categoryId',
    ref:'SubCategory'

})
const CategoryModel = model('Category',categoryShema);
export default CategoryModel;