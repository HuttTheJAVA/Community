

const deletePostButton = document.getElementById('delete-post');
const button_cancel = document.getElementById("cancel");
const button_ok = document.getElementById("ok");


function post_delete_message(){
  const toastMessage = document.getElementById('toastMessage');

  const title = document.getElementById('toastTitle');
  const content = document.getElementById('toastContent');
  
  title.innerHTML="게시글을 삭제하시겠습니까?";
  content.innerHTML="삭제한 내용은 복구 할 수 없습니다.";
  button_ok.innerHTML="확인";
  button_cancel.innerHTML="취소";
  toastMessage.style.opacity = 1;
  document.getElementById('toastMessage').classList.remove('hidden');
}

function reply_delete_message(){
  const toastMessage = document.getElementById('');
}

function hideToast(){
  toastMessage.style.opacity = 0;
}

function post_delete(){
  window.location.href = "/board";
}

deletePostButton.addEventListener('click', post_delete_message);
button_cancel.addEventListener('click',hideToast);
button_ok.addEventListener('click',post_delete);