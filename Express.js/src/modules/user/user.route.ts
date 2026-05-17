import { Router, type Request, type Response } from "express";

import { useController } from "./user.controller";


const router = Router()

router.post("/", useController.createUser);
router.get("/",useController.getUser);
router.get("/:id",useController.getUserById);
router.put("/:id",useController.updateUser);
router.delete("/:id",useController.deleteUser)

export const useRoute = router;