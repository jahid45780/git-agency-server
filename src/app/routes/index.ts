import { Router } from "express";
import { userRoute } from "../modules/user/user.route";

export const router = Router()

const moduleRouter = [

   { path:"/user",
    route:userRoute}
]


moduleRouter.forEach((route)=>{
    router.use(route.path, route.route)
 })


