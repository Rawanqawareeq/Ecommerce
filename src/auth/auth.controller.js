import 'dotenv/config'
import UserModel from "../../model/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {sendemail} from '../utls/email.js'
export const register = async(req,res)=>{
    const {userName,email,password} = req.body;
   
    const user = await UserModel.findOne({email});
    if(user){
        return res.status(409).json({massege:"email already exists"});
    }
    const hashpassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    const createUser = await UserModel.create({userName,email,password:hashpassword});
    await sendemail(email,`welcome`,`<h2>welcome ${userName}</h2>`);
    return res.status(200).json({massege:"success",User:createUser });
}
export  const login = async(req,res)=>{
    const{email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(409).json({massege:"email not exists"});
    }
    const match = await bcrypt.compare(password,user.password);
    if(user.status == 'NotActive'){
        return res.status(409).json({massege:"your Account is blocked"});
    }
    if(!match){
        return res.status(409).json({massege:"password not valid"});
    }
    const token = jwt.sign({id:user._id,role:user.role},process.env.LOGINSIG);
    return res.status(409).json({massege:"success",token});

}