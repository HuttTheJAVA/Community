const BACKEND_IP_PORT = "http://localhost:8081"
import {getUserIdFromSession} from './session.js';
import {getUser,getUsers} from './getUser.js';
import { checkDuplicatenickName } from "./checkDuplicate.js";

const button_cancel = document.getElementById("cancel");
const button_ok = document.getElementById("ok");

function deleteMember(){
  const title = document.getElementById('toastTitle');
  const content = document.getElementById('toastContent');
  
  title.innerHTML="회원탈퇴 하시겠습니까?";
  content.innerHTML="작성된 게시글과 댓글은 삭제됩니다.";
  button_ok.innerHTML="확인";
  button_cancel.innerHTML="취소";
}

function hideToast(){
  document.getElementById("myModal").style.display = "none";
}

async function member_delete(){
    // 실제 멤버 삭제하는 요청을 서버에게 해야함.
    
    let userSessionId = ''

    const result = {
        userId:''
    }

    await getUserIdFromSession(result);

    userSessionId = result.userId;

    const obj = {
      userId:userSessionId
    }

    const data = {
      method:"DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }

    await fetch(`${BACKEND_IP_PORT}/user`,data)
    .then(response =>{
      if(response.status === 204){
          alert("사용자가 삭제 되었습니다");
      }else{
          alert("사용자 삭제 실패");
      }
    })
    .catch(error => {
        console.error('fetch error:',error);
    });

    hideToast();
    window.location.href = "/user/login";
}

let btn = document.getElementById("deleteMember");

btn.onclick = function() {
    deleteMember();
    document.getElementById("myModal").style.display = "block";
}

// deletePostButton.addEventListener('click', post_delete_message);
button_cancel.addEventListener('click',hideToast);
button_ok.addEventListener('click',member_delete);

const adjust = document.getElementById('adjust');

const helper = document.getElementById('nickNameHelper');

function insertErrorMessage(message){
    helper.innerText = "";
    helper.innerText = message;
}

adjust.onclick = async function(){

  const result = {
    userId:''
  }

  await getUserIdFromSession(result);

  const nickname = document.getElementById('nickName').value;

  if(!nickname){
      insertErrorMessage("*닉네임을 입력해주세요.");
      return;
  }
  else if(nickname.length>10){
      insertErrorMessage("*닉네임은 최대 10자 까지 작성 가능합니다.");
      return;
  }
  else{ // 닉네임 중복 확인 로직이 들어가야함.
    let isDuplicate = false;

    const msg = await checkDuplicatenickName(nickname);

    if(msg !== ""){
      isDuplicate = true;
    }

    if(isDuplicate){
      insertErrorMessage("*이미 존재하는 닉네임입니다.");
      return;
    }
  }
  
  // 이미지 업로드 부분
  const profileImage = document.getElementById('profile-image-upload').files[0];
  
  const formData = new FormData();

  let encodedFileName;

  if(profileImage){
    encodedFileName = encodeURIComponent("/user/"+profileImage.name);
    formData.append('image', profileImage,encodedFileName);
  }else{
    insertErrorMessage("*이미지를 선택하세요.");
  }

  // 유저 수정 정보 전송

  const obj = {
    userId:result.userId,
    nickname:nickname,
    imgName:encodedFileName,
  }

  const data = {
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }

  await fetch(`${BACKEND_IP_PORT}/user/update`,data)
  .catch(err => {
    console.error("fetch error:",err);
  });

  // 이미지 저장 부분

  const isEmpty = formData.entries().next().done;

  if(!isEmpty){
    await fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
      if(response.ok){
          console.log("이미지 성공적으로 업로드.");
      }else{
          console.error("이미지 업로드 오류 발생");
      }
      })
      .catch(error => {
          console.error('네트워크 오류:',error);
      });
  }

  helper.innerText = ""; // 이전에 유효하지 않은 입력을 한 적이 있다면 helper.innerText = ""이 아니다. 따라서 지워줘야 됨 
  
  let toastMessage = document.getElementById("adjustToast");
  toastMessage.textContent = "수정 완료";

  toastMessage.style.display = "block";

  // 사용자 수정 정보 

  // 비동기 논블로킹 코드
  setTimeout(function() {
    toastMessage.style.display = "none";
    window.location.href = '/post';
  }, 3000);
    
}

async function pageLoadActive(){

  let userSessionId = ''

  const result = {
      userId:''
  }

  await getUserIdFromSession(result);

  userSessionId = result.userId;

  const userInfo = {
    email:"",
    nickname:"",
    profileImage:"",
  }

  const userArr = await getUser(userSessionId);

  const user = userArr[0];

  userInfo.email = user.email;
  userInfo.nickname = user.nickname;
  userInfo.profileImage = user.profileImage;

  let dropbtn = document.querySelector('.dropbtn');
  dropbtn.style.backgroundImage = `url("/images/${userInfo.profileImage}")`;

  let big_image = document.getElementById("user-profile-image");
  big_image.src = `/images/${userInfo.profileImage}`;

  let email = document.getElementById("email");
  email.innerText = userInfo.email;

  let nickname = document.getElementById("nickName");
  nickname.value = userInfo.nickname;

  //// 이미지 처리
  const userBigImage = document.querySelector(".user-big-image");

  // 파일 업로드 input 요소를 가져옵니다.
  const profileImageUpload = document.getElementById("profile-image-upload");
  
  // 이미지를 렌더링할 img 요소를 가져옵니다.
  const userProfileImage = document.getElementById("user-profile-image");

  userBigImage.addEventListener("click", function() {
    // 파일 업로드 input을 클릭합니다.
    profileImageUpload.click();
  });

  profileImageUpload.addEventListener("change", function() {
    // 선택한 파일이 있는지 확인합니다.
    if (profileImageUpload.files && profileImageUpload.files[0]) {
      // FileReader 객체를 생성합니다.
      const reader = new FileReader();
      
      // 파일을 읽었을 때의 이벤트를 설정합니다.
      reader.onload = function(e) {
        // 이미지를 렌더링합니다.
        userProfileImage.src = e.target.result;
      }
      
      // 파일을 읽습니다.
      reader.readAsDataURL(profileImageUpload.files[0]);
    }
  });

}

document.addEventListener('DOMContentLoaded', pageLoadActive);