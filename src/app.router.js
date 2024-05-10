import connectDB from "../db/connection.js";
import cors from 'cors'
import CategoryRouter from "./category/category.router.js";

const initApp=(app,express)=>{
    connectDB();
    app.use(cors());
 app.use(express.json());

 app.use('/category',CategoryRouter);
 app.use('/',(req,res)=>{
    return res.status(201).json({message:"success"})
  });
 app.use('*',(req,res)=>{
    return res.status(404).json({message:"page not found"})
  });
}
export default initApp;