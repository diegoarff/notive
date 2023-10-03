import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validator } from "../middlewares/validator";
import {
  registerSchema,
  loginSchema,
} from "../middlewares/schemas/auth.schemas";

const router = Router();

router.post("/register", validator(registerSchema), register);

router.post("/login", validator(loginSchema), login);

export default router;
