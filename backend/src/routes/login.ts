import { Router } from "express";
import { loginUser } from "../controller/auth-controller";

const router = Router();

router.post("/register", loginUser);

export default router;