import express from 'express'; 
import path from 'path';
import cors from 'cors';
import multer from 'multer';

import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';

const app = express();
const port = 8080;
const __dirname = path.resolve();

app.use(express.static(__dirname + "/public")); 
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/index.html'));
});

app.use('/user', userRouter);
app.use('/post', postRouter);

//##########################################################//
const uploadDirectory = path.join(__dirname, '/public/images');
const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: function (req, file, cb) {
    console.log("file.originalname:",file.originalname);
    const decodedFileName = decodeURIComponent(file.originalname);
    console.log("decodedFileName:",decodedFileName);
    cb(null, decodedFileName);
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    res.send('이미지가 성공적으로 업로드되었습니다.');
});
app.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/imageUpload.html'));
});
//##########################################################//


app.listen(port, () => {
    console.log(`FrontEnd Server app listening on port ${port}`);
});