import { Router } from "express";
import {forgotPassword, resetPassword, getProfile, login, logout, register } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";


const router = Router();

router.post('/register',upload.single("avatar"),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',getProfile);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);

export default router;                                        