import express from 'express'; 
import cors from 'cors';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';

const FRONTEND_IP_PORT = 'http://localhost:8080';

const app = express();

const session = {
    secret: "my key",
    resave: true,
    saveUninitialized: true,
}

const port = 8081; 

app.use(cors({
    origin: `${FRONTEND_IP_PORT}`,
    credentials: true
}));

app.use(cookieParser());
app.use(expressSession(session));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`BackEnd Server app listening on port ${port}`);
});