import express from 'express'; 
import path from 'path';
import cors from 'cors';

import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';

const app = express();
const port = 8080; 
const __dirname = path.resolve();

app.use(express.static(__dirname + "/frontend-server/public")); 
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/index.html'));
});

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});