import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.get('/session',(req,res) => {
    if(req.session && req.session.user && req.session.user.nickname){
        return res.json({nickname: req.session.user.nickname});
    }else{
        return res.json({nickname: ''})
    }
})

router.post('/sign-in', userController.validateUser);

router.post('/join',userController.joinUser);

router.get('/',userController.getUsers);

export default router;