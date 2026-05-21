import AppError from "../../errorHerplrs/appError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload:Partial<IUser>)=>{
 
    const {email, password, ...rest} = payload;
    
   const isUserExist = await User.findOne({email});
   
    if(isUserExist){

        throw new AppError(400, "user already exist with this email")
    }

    
}