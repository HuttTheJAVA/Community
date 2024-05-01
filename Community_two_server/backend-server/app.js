import express from 'express'; 
import cors from 'cors';

import bodyParser from 'body-parser';

import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';

const app = express();
const port = 8081; 

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`BackEnd Server app listening on port ${port}`);
});