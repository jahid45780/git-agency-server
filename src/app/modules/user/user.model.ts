import {  model, Schema } from "mongoose";
import { IAuthProvider, isActive, IUser, Role } from "./user.interface";


export const authProviderSchema = new Schema<IAuthProvider>({
     provider:{type:String, required:true},
     providerID:{type:String, required:true}
},{
    versionKey:false,
    id:false
})

const userSchema = new  Schema<IUser>({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    phone:{type:String},
    address:{type:String},
    picture:{type:String},
    IsDeleted:{type:Boolean, default:false},
    IsVerified:{type:Boolean, default:false},
    IsActive:{type:String, 
    enum:isActive,
    default:isActive.ACTIVE},
    auths:[authProviderSchema],
    createdAt:{type:Date, default:Date.now},
    role:{type:String,
     enum:Object.values(Role), 
     default:Role.USER}
},{
    timestamps:true,
    versionKey:false
})

export const User = model<IUser>("User", userSchema)
