

const deletePostButton = document.getElementById('delete-post');
const button_cancel = document.getElementById("cancel");
const button_ok = document.getElementById("ok");


function post_delete_message(){
  const title = document.getElementById('toastTitle');
  const content = document.getElementById('toastContent');
  
  title.innerHTML="게시글을 삭제하시겠습니까?";
  content.innerHTML="삭제한 내용은 복구 할 수 없습니다.";
  button_ok.innerHTML="확인";
  button_cancel.innerHTML="취소";
}

function hideToast(){
  document.getElementById("myModal").style.display = "none";
}

function post_delete(){
  window.location.href = "/board";
}

var btn = document.getElementById("myBtn");

btn.onclick = function() {
  document.getElementById("myModal").style.display = "block";
  post_delete_message();
}

// deletePostButton.addEventListener('click', post_delete_message);
button_cancel.addEventListener('click',hideToast);
button_ok.addEventListener('click',post_delete);