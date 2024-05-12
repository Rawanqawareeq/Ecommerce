import connectDB from "../db/connection.js";
import cors from 'cors'
import CategoryRouter from "./category/category.router.js";
import AuthRouter from "./auth/auth.router.js";
import SubCategoryRouter from "./subcategory.js/subcategory.router.js";

const initApp=(app,express)=>{
    connectDB();
    app.use(cors());
 app.use(express.json());

 app.use('/category',CategoryRouter);
 app.use('/subcategory',SubCategoryRouter);
 app.use('/auth',AuthRouter);
 app.get('/',(req,res)=>{
    return res.status(201).json({message:"success"})
  });
 app.use('*',(req,res)=>{
    return res.status(404).json({message:"page not found"})
  });
}
export default initApp;