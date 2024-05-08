import path from 'path';
import express from 'express';

const router = express.Router();

const __dirname = path.resolve();

router.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'view/login.html'));
});

router.get('/join',(req,res) => {
    res.sendFile(path.join(__dirname,'view/join.html'));
});

router.get('/update',(req,res) => {
    res.sendFile(path.join(__dirname,'view/memberAdjust.html'));
});

export default router;