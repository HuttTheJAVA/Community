import { checkDuplicatenickName,checkDuplicateEmail } from "./checkDuplicate.js";
const passwordHelper = document.getElementById('passwordHelper');
const passwordCheckHelper = document.getElementById('passwordCheckHelper');
const emailHelper = document.getElementById('emailHelper');
const nickNameHelper = document.getElementById('nickNameHelper');

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const passwordCheck = document.getElementById('password-check').value;
const nickName = document.getElementById('nickName').value;
const btn = document.getElementById('join');

function validateEmail(email) {
    // 이메일이 비어 있는지 확인
    if (!email) {
        return "이메일을 입력하세요.";
    }
    
    // 이메일 길이 확인
    if (email.length < 5) {
        return "이메일이 너무 짧습니다.";
    }
    
    // 이메일 형식 확인 (간단한 형식)
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "올바른 이메일 주소 형식을 입력해주세요.(예:abc@example.com)";
    }
    
    // 모든 조건 통과
    return "";
}

function validatePassword(password) {

    const validErrorMessage = "올바른 비밀번호 형식을 입력하세요.";

    // 이메일이 비어 있는지 확인
    if (!password) {
        return "비밀번호를 입력해주세요";
    }
    
    // 비밀번호 길이는 8~20
    if (!(password.length<=20 && password.length>=8)){
        return validErrorMessage;
    }

    // 대문자,소문자 알파벳 각각 한개씩은 포함해야함.
    if(!/[A-Z]/.test(password) || !/[a-z]/.test(password)){
        return validErrorMessage;
    }

    // 숫자와 특수문자 각각 한개씩은 포함해야함.
    if(!/\d/.test(password) || !/\W/.test(password)){
        return validErrorMessage;
    }
    return "";
}

async function check_passWords(){

    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('password-check').value;

    var passWordErrorMessage = await validatePassword(password);

    var passwordCheckErrorMessage = await validatePassword(passwordCheck);
    
    if (passWordErrorMessage){
        return passWordErrorMessage;
    }
    if (passwordCheckErrorMessage) {
        return passwordCheckErrorMessage;
    }
    
    if(!password == passwordCheck){
        return '비밀번호와 비밀번호 확인이 다릅니다.'
    }
    return "";
    
}

function checkNickName(nickName){
    if(!nickName){
        return "*닉네임을 입력해주세요.";
    }else if(nickName.length > 10){
        return "*닉네임은 최대 10자 까지 작성 가능합니다.";
    }else if(/\s/.test(nickName)){
        return "*띄어쓰기를 없애주세요.";
    }

    return "";
}

async function activate_button(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('password-check').value;
    const nickName = document.getElementById('nickName').value;

    let email_err = await validateEmail(email);
    let passwordCompare_err = await check_passWords(password,passwordCheck);
    let nickName_err = await checkNickName(nickName);

    if(!email_err && !passwordCompare_err && !nickName_err){
        btn.style.backgroundColor = '#7F6AEE';
    }else{
        btn.style.backgroundColor = '#ACA0EB';
    }
}

async function global_validation(){

    emailHelper.innerText = '';
    nickNameHelper.innerText = '';
    passwordHelper.innerText = '';
    passwordCheckHelper.innerText = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('password-check').value;
    const nickName = document.getElementById('nickName').value;

    let email_err = await validateEmail(email);
    let password_err = await validatePassword(password);
    let passwordCheck_err = await validatePassword(passwordCheck);
    let nickName_err = await checkNickName(nickName);
    let passwordCompare_err = "";
    
    if(password != passwordCheck){
        passwordCompare_err = "비밀번호와 비밀번호 확인이 서로 다릅니다.";
    }

    if(!nickName_err){
        await checkDuplicatenickName(nickName)
        .then(duplicateMessage => {
            nickName_err = duplicateMessage;
        })
    }   

    if(!email_err){
        await checkDuplicateEmail(email)
        .then(duplicateMessage => {
            email_err = duplicateMessage;
        })
    }

    if(!email_err && !password_err && !passwordCheck_err && !nickName_err && !passwordCompare_err){
        // 완료 처리 및 페이지 이동
        
        // 회원가입 완료 메시지 표시
        alert("회원가입 완료!");
        
        // 페이지 이동
        window.location.href = "/login";
        
    }else{
        emailHelper.innerText = email_err;
        
        nickNameHelper.innerText = nickName_err;
        
        if(password_err || passwordCheck_err){
            passwordHelper.innerText = password_err;
            passwordCheckHelper.innerText = passwordCheck_err;
        }else{ // 이거는 비번과 비번 확인에 에러가 없고 비번 비교에 에러가 있을 경우 렌더링 즉. 비번, 비번 확인에 에러가 있다면 그것만 보여주고 이 메시지는 에러가 존재한다고 해도 보여주지 않음. 일단 비번, 비번확인 에러부터 고치는게 급선무니까
            passwordCheckHelper.innerText = passwordCompare_err;
        }
    }

}

function showImageHelper() {
    var image = document.getElementById('uploaded-image');
    var imageHelper = document.getElementById('imageHelper');
  
    // 이미지가 없는 경우
    if (!image.src.startsWith('data:')) {
      imageHelper.innerText = "*프로필 사진을 추가해주세요.";
    } else {
      // 이미지가 있는 경우
      imageHelper.innerText = "";
    }
}

window.onload = function() {
    showImageHelper();
};

document.getElementById('circle').addEventListener('click', function() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function() {
                var img = document.getElementById('uploaded-image');
                img.style.display = 'block'; // 이미지를 보이도록 설정합니다.
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

document.getElementById('uploaded-image').addEventListener('load',showImageHelper);

// 십자선 클릭 시 이벤트 버블링 방지
document.getElementById('crosshair').addEventListener('click', function(event) {
    event.stopPropagation();
});

document.getElementById("email").addEventListener('input',activate_button);
document.getElementById("password").addEventListener('input',activate_button);
document.getElementById("password-check").addEventListener('input',activate_button);
document.getElementById("nickName").addEventListener('input',activate_button);

btn.addEventListener('click',global_validation);