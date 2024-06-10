import express from 'express'; 
import cors from 'cors';
import mysql from 'mysql2';
import MySQLStore from 'express-mysql-session';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';

const FRONTEND_IP_PORT = 'http://localhost:8080';

const app = express();

// mysql 서버 주소
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '025044',
    database: 'community'
};

const sessionStore = new MySQLStore(options);

const session = {
    secret: "curryRice",
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15, // 15분
    },
};

app.use(expressSession(session));

const port = 8081; 

app.use(cors({
    origin: `${FRONTEND_IP_PORT}`,
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`BackEnd Server app listening on port ${port}`);
});