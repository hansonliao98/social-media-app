import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); //allows express to identify that all thes routes are gonna be configured

router.post("/login", login);

export default router;
