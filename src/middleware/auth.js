import jwt from "jsonwebtoken";
import UserModel from "../../model/user.model.js";

export const auth =(accessRole = [])=>{
    return async(req,res,next)=>{
        const {authorization} = req.headers;
        if(!authorization?.startsWith(process.env.BEARERT)){
            return res.status(400).json({massege:"invalid token"});

        }
       const token  = authorization.split(process.env.BEARERT)[1];
       const decode =  jwt.verify(token,process.env.LOGINSIG);
       if(!decode){
        return res.status(400).json({massege:"invalid token"});
       }
       const user = await UserModel.findById(decode.id).select("userName role");
       
       if(!user){
        return res.status(400).json({massege:"User not found"});
       }
       if(!accessRole.includes(user.role)){
        return res.status(403).json({massege:"not auth User"});
       }
        req.user = user;
        next();
       
       
      
    }
}