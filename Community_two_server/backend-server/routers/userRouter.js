import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.post('/sign-in', userController.validateUser);

export default router;