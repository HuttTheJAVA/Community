const deleteMemberButton = document.getElementById('deleteMember');
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

function member_delete(){
    // 실제 멤버 삭제하는 요청을 서버에게 해야함.
    hideToast();
    window.location.href = "/login";
}

var btn = document.getElementById("deleteMember");

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

adjust.onclick = function(){
    const nickName = document.getElementById('nickName').value;
    if(!nickName){
        insertErrorMessage("*닉네임을 입력해주세요.");
    }
    else if(false){ // 닉네임 중복 확인 로직이 들어가야함.
        insertErrorMessage("*닉네임을 입력해주세요.");
    }
    else if(nickName.length>10){
        insertErrorMessage("*닉네임은 최대 10자 까지 작성 가능합니다.");
    }
    else{ 
        helper.innerText = ""; // 이전에 유효하지 않은 입력을 한 적이 있다면 helper.innerText = ""이 아니다. 따라서 지워줘야 됨 
        var toastMessage = document.getElementById("adjustToast");
        toastMessage.textContent = "수정 완료";

        toastMessage.style.display = "block";

        // 그 유명한 비동기 논블로킹 코드
        setTimeout(function() {
            toastMessage.style.display = "none";
        }, 3000); 
    }
}

document.querySelector('.change-button').addEventListener('click', function() {
    // 파일 입력(input) 요소 선택
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
  
    // 파일 선택 시의 이벤트 처리
    fileInput.addEventListener('change', function(event) {
      var file = event.target.files[0]; // 선택된 파일 가져오기
      if (file) {
        var reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
        reader.onload = function(e) {
          // 선택된 이미지를 user-big-image에 적용
          var image = document.querySelector('.user-big-image img');
          image.src = e.target.result;
        };
        reader.readAsDataURL(file); // 파일을 base64 형식의 데이터 URL로 변환하여 읽음
      }
    });
  
    // 파일 입력(input) 요소 클릭
    fileInput.click();
  });