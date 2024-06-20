### 🎬 과제 시연 동영상

🔗 https://www.youtube.com/watch?v=eVBjY3X_y5Q&t=1s


<img width="989" alt="Untitled" src="https://github.com/HuttTheJAVA/KakaoCloudSchool/assets/92637789/e4d30376-da13-4377-8842-2df79721c5b8">



**개략도**
<br></br>
## ✅ 컴포넌트


- Front-Server : 클라이언트에게 정적 리소스 제공을 담당하는 서버
- Back-Server : 페이지에 필요한 데이터 제공을 담당하는 서버
- Controller : Request의 body,Path Variable을 Model이 사용할 수 있도록 전처리 담당
- Model : Controller로부터 받은 파라미터를 DAO가 쿼리에 사용할 수 있도록  파라미터 쿼리 매핑 담당
- DAO : DB의 연결과 쿼리 실행을 담당
- MySQL : 데이터 저장 및 관리를 담당<br></br>

## ✅ 사용 라이브러리


- multer : 클라이언트 업로드 파일을 서버에 저장하기 위해 사용
- express-session : 세션 사용을 위해 사용
- express-mysql-session : 세션 저장 및 관리를 위해 사용
- mysql2 : 데이터베이스 연결 및 상호작용을 위해 사용
- cors : 다른 도메인 간(프론트 서버 ↔ 백 서버)의 자원 공유를 허용<br></br>

## ✅ URL


- http://localhost:8080/는 모든 URL에 기본적으로 포함되므로 URL 표현에서 생략<br></br>

## 프론트 서버

### 📄 Post

```jsx
GET ~/post = 게시글 목록 페이지

GET ~/post/create = 게시글 작성 페이지

GET ~/post/:postId = id가 postId인 게시글 상세 페이지

GET ~/post/adjustPost/:postId = id가 postId인 게시글 수정 페이지
```

### 👨‍💼 User

```jsx
GET ~/user/login = 로그인 페이지

GET ~/user/join = 회원가입 페이지

GET ~/user/update = 회원정보 수정 페이지

GET ~/user/adjustPassword = 회원 비밀번호 수정 페이지
```
<br></br>
## 백 서버

### 📄 Post

```jsx
GET ~/post = 게시글들 데이터 반환

GET ~/post/:postId = 상세 게시글 데이터 반환

GET ~/post/:postId/reply = 특정 게시글의 댓글들 데이터 반환

POST ~/post/create = 게시글 생성

POST ~/post/:postId/reply = 게시글 댓글 생성

PATCH ~/post/:postId = 특정 게시글 수정 

PUT ~/post/:postId/reply/:replyId = 특정 게시글의 댓글 수정

DELETE ~/post/:postId = 특정 게시글 삭제

DELETE ~/post/:postId/reply/:replyId = 특정 게시글의 댓글 삭제
```

### 👨‍💼 User

```jsx
GET ~/user/session = 유저 세션 확인

GET ~/user/nickname/:nickname = 닉네임으로 유저를 조회 (회원가입 시 중복 닉네임 확인용)

GET ~/user/email/:email = 이메일로 유저를 조회 (회원가입 시 중복 이메일 확인용)

GET ~/user/:userId = 유저 조회 

POST ~/user/sign-in = 유저 로그인 

POST ~/user/join = 유저 회원가입

PATCH ~/user/update = 유저 정보 수정 (req.body에 userId 포함)

PATCH ~/user/password = 유저 비밀번호 수정 (req.body에 userId 포함)

DELETE ~/user = 유저 삭제 (req.body에 userId 포함)
```
