import fs from 'fs';
import express from 'express';
import userController from '../controller/userController.js';
import path from 'path';

const __dirname = path.resolve();

const router = express.Router();

router.get('/session',(req,res) => {

    if (req.session && req.session.user && req.session.user.userId) {
        res.json({userId: req.session.user.userId});
    } else {
        res.json({ userId: '' });
    }
})

router.post('/sign-in', userController.validateUser);

router.post('/join',userController.joinUser);

router.delete('/',userController.deleteUser);

router.patch('/update',userController.updateUser);

router.patch('/password',userController.updatePassword);

router.get('/nickname/:nickname',userController.getUserByNickname);

router.get('/email/:email',userController.getUserByEmail);

router.get('/:userId',userController.getUser);


export default router;