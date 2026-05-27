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

const updateUser = catchAsync (async (req:Request, res:Response, next:NextFunction)=>{
        const payload = req.body;
        const userId = req.params.id;

        const result = await userService.updateUser(userId as string, payload);

        sentResponse(res,{
            statusCode: 200,
            success: true,
            message: "user updated successfully",
            data: result
        })
})

 export const userController = {
    createUser,
    updateUser
}