import { Router } from "express";
import { userController } from "./user.controller";

const router = Router()

router.post("/register", userController.createUser)
router.get("/all-users", userController.getAllUser)
router.get("/:id", userController.singleUser)
router.patch("/:id", userController.updateUser)


export const userRoute = router;