import express from 'express';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();

router.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,'view/board.html'));
});

router.get("/:postId",(req,res) => {
    res.sendFile(path.join(__dirname,'view/post-view.html'));
});

export default router;