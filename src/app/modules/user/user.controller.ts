/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sentResponse } from "../../utils/sendResponse";

const createUser = catchAsync (async (req:Request, res:Response, next:NextFunction)=>{
    
    const payload = req.body;

    const result = await userService.createUser(payload);

    sentResponse(res,{
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: result
    })

})

 export const userController = {
    createUser
}