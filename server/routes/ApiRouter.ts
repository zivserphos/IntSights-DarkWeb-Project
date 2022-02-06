import { Router } from "express";
import getPage from "../controllers/ApiController";

const router = Router();

router.get("/", getPage);

export default router;
