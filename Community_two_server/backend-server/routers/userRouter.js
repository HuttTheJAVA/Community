import fs from 'fs';
import express from 'express';
import userController from '../controller/userController.js';
import path from 'path';

const __dirname = path.resolve();

const router = express.Router();

router.get('/session',(req,res) => {
    if(req.session && req.session.user && req.session.user.userId){

        const usersJsonFile = fs.readFileSync(__dirname + '/model/repository/users.json', 'utf8');
        
        const usersJsonData = JSON.parse(usersJsonFile);

        console.log(req.session.user.userId);

        if(req.session.user.userId in usersJsonData){
            return res.json({userId: req.session.user.userId});
        }
        else{
            return res.json({userId: ''});
        }
    }else{
        console.log('여긴 왜????')
        return res.json({userId: ''});
    }
})

router.post('/sign-in', userController.validateUser);

router.post('/join',userController.joinUser);

router.get('/',userController.getUsers);

router.delete('/',userController.deleteUser);

router.patch('/update',userController.updateUser);

router.patch('/password',userController.updatePassword);

router.get('/:userId',userController.getUser);

export default router;