import { Router } from "express";
import { register } from "../controllers/auth";

const router = Router();

router.post("/", register);

router.post("/sessions");

export default router;
