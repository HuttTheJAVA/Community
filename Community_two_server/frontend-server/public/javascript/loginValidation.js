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

    if (email != 'chy@naver.com'){
        return "이메일을 다시 확인해보세요.";
    }
    
    // 모든 조건 통과
    return "";
}

function validatePassword(password) {

    const validErrorMessage = "올바른 비밀번호 형식을 입력하세요.";

    if (password == 'Chy1234!'){
        return "";
    }

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
    
    if(password != 'Chy1234!'){
        return "비밀번호가 다릅니다.";
    }
}

function button_change(){
    const emailInput = document.getElementById('email').value;
    const passWord = document.getElementById('password').value;
    const button = document.getElementById('login');

    const emailMessage = validateEmail(emailInput);
    const passWordMessage = validatePassword(passWord);

    let validation_condition1 = true;
    let validation_condition2 = true;

    if(!(emailMessage == "이메일을 다시 확인해보세요." || emailMessage == "")){
        validation_condition1 = false;
    }
    if(!(passWordMessage == "" || passWordMessage == "비밀번호가 다릅니다.")){
        validation_condition2 = false;
    }
    if(validation_condition1 && validation_condition2){
        button.style.backgroundColor = "#7F6AEE";
    }else{
        button.style.backgroundColor = "#ACA0EB";
    }
}

document.getElementById("login").addEventListener('click', function() {
    var email = document.getElementById("email").value;
    var errorMessage = validateEmail(email);
    
    var password = document.getElementById("password").value;
    var passWordErrorMessage = validatePassword(password);

    document.getElementById('emailHelper').innerHTML = '';

    document.getElementById('passwordHelper').innerHTML = '';
    
    if (errorMessage) {
        document.getElementById('emailHelper').innerHTML = '* '+errorMessage;
    }
    if (passWordErrorMessage){
        document.getElementById('passwordHelper').innerHTML = '* '+passWordErrorMessage;
    }
    if(!errorMessage && !passWordErrorMessage){
        window.location.href = "/board";
    }
});

document.getElementById("email").addEventListener('input',function(){
    button_change();
});

document.getElementById("password").addEventListener('input',function(){
    button_change();
});

document.getElementById("join").addEventListener('click',function(){
    window.location.href = "/join";
})