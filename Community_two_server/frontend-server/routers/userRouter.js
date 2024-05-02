import path from 'path';
import express from 'express';

const router = express.Router();

const __dirname = path.resolve();

router.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'view/login.html'));
});

export default router;