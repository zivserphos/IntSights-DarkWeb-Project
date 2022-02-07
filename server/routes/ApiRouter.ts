import { Router } from "express";
import sse from "../controllers/ApiController";

const router = Router();

router.get("/", sse);

export default router;
