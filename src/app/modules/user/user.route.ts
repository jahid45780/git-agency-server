import { Router } from "express";
import { userController } from "./user.controller";

const router = Router()

router.post("/register", userController.createUser)
router.patch("/:id", userController.updateUser)


export const userRoute = router;