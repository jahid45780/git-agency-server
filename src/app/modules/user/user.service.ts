import { envVers } from "../../config/env";
import AppError from "../../errorHerplrs/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcrypt";

const createUser = async (payload:Partial<IUser>)=>{
 
    const {email, password, ...rest} = payload;
    
   const isUserExist = await User.findOne({email});
   
    if(isUserExist){

        throw new AppError(400, "user already exist with this email")
    }

    const  hashedPassword = await bcryptjs.hash(password as string, Number(envVers.BCRYPT_SALT_ROUND))
    
    const authProvider:IAuthProvider = {provider:"credentials", providerID: email as string} 

    const user = await User.create({
         email,
         password: hashedPassword,
         auths:[authProvider],
         ...rest

    })

    return user;

}

const updateUser = async (userId:string, payload:Partial<IUser>)=>{

    const isUserExist = await User.findById(userId);

    if(!isUserExist){
        throw new AppError(404,"user not found")
    }

    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {new:true, runValidators:true});

    return newUpdateUser;

}


 export const userService = {
    createUser,
    updateUser
}