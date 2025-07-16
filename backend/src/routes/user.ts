import { Router } from "express";
import { getUserById } from "../controller/user-controller";

const router = Router();
router.get("/user/:id", getUserById);

export default router;
