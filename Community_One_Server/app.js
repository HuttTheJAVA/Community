// express 모듈을 불러옵니다.
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

// express 애플리케이션을 생성합니다.
const app = express();
// 웹 서버가 사용할 포트 번호를 정의합니다.
const port = 3000;

const __dirname = path.resolve();

app.use(bodyParser.json());

///////////////////////////////
const jsonFilePath = path.join(__dirname, 'public', 'posts.json');

app.post('/saveData', (req, res) => {
  const jsonData = req.body;
  console.log(jsonData);
  // JSON 파일 업데이트 함수 호출
  updateJsonFile(jsonData);

  res.json({ message: '데이터가 성공적으로 저장되었습니다.' });
});

function updateJsonFile(data) {
  let jsonData = {};
  console.log(typeof data);
  try {
    const existingData = fs.readFileSync(jsonFilePath, 'utf8');
    jsonData = JSON.parse(existingData);
  } catch (error) {
    console.error('JSON 파일 읽기 오류:', error);
  }

  let key_cnt = Object.keys(jsonData).length
  console.log(key_cnt);

  jsonData = { ...jsonData, ...data };

  key_cnt = Object.keys(jsonData).length
  console.log(key_cnt);

  console.log(data);
  
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData));
    console.log('JSON 파일이 업데이트되었습니다.');
  } catch (error) {
    console.error('JSON 파일 쓰기 오류:', error);
  }
}
///////////////////////////////

app.use(express.static('public'));

/**
 * 루트 경로('/')에 대한 GET 요청을 처리
 * 요청이 오면 'Hello World!' 문자열을 응답
 */
// req = request(요청), res = response(응답)
app.get('/', (req, res) => {
  // 응답.보내다('Hello World!');
  res.send('Hello World!');
});

function sendFileByPathname(req, res, pathname) {
  const filePath = path.join(__dirname, `views/${pathname}`);
  res.sendFile(filePath);
}

app.get('/login',(req,res) => {
  sendFileByPathname(req,res,'login.html');
});

app.get('/post',(req,res) => {
  sendFileByPathname(req,res,'post.html');
});

app.get('/api/post/:postId', (req, res) => {
  let jsonData = {};
  const postId = req.params.postId; // postId 추출
  let postJson = {};
  
  try {
    const existingData = fs.readFileSync(jsonFilePath, 'utf8');
    jsonData = JSON.parse(existingData);
    postJson = jsonData[postId];
    res.json(postJson);
  } catch (error) {
    console.error('JSON 파일 읽기 오류:', error);
  }
});

app.get('/api/reply/:postId',(req,res)=>{
  let jsonData = {};
  const postId = req.params.postId; // postId 추출
  let postJson = {};
  
  try {
    const existingData = fs.readFileSync(path.join(__dirname, 'public', 'reply.json'), 'utf8');
    jsonData = JSON.parse(existingData);
    postJson = jsonData[postId];
    res.json(postJson);
  } catch (error) {
    console.error('JSON 파일 읽기 오류:', error);
  }
});

app.get('/api/user/:nickName',(req,res)=>{
  const nickName = req.params.nickName;
  const existingData = fs.readFileSync(path.join(__dirname, 'public', 'users.json'), 'utf8');
  const jsonData = JSON.parse(existingData);
  const imageFilePath = path.join(__dirname, 'public','images', jsonData[nickName]["profileImage"]);
  res.sendFile(imageFilePath);
});

app.get('/api/users',(req,res)=>{
  const existingData = fs.readFileSync(path.join(__dirname, 'public', 'users.json'), 'utf8');
  const jsonData = JSON.parse(existingData);
  res.json(jsonData);
});

app.get('/post/:postId',(req,res) => {
  console.log('here ');
  sendFileByPathname(req,res,'post-view.html');
});

app.get('/post-view',(req,res) => {
  sendFileByPathname(req,res,'post-view.html');
});

app.get('/memberAdjust',(req,res) => {
  sendFileByPathname(req,res,'memberAdjust.html');
});

app.get('/join',(req,res) => {
  sendFileByPathname(req,res,'join.html');
});

app.get('/board',(req,res) => {
  sendFileByPathname(req,res,'board.html');
});

app.get('/adjustPost/:postId',(req,res) => {
  sendFileByPathname(req,res,'adjustPost.html');
});

app.get('/adjustPassword',(req,res) => {
  sendFileByPathname(req,res,'adjustPassword.html');
});

app.get('/abc',(req,res) => {
  sendFileByPathname(req,res,'modal.html');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

