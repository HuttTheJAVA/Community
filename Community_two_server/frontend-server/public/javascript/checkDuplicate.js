const BACKEND_IP_PORT = "http://localhost:8081"

export function checkDuplicatenickName(nickname){

    return new Promise((resolve,reject) => {
    fetch(`${BACKEND_IP_PORT}/user/nickname/${nickname}`)
    .then(response => response.json())
    .then(data => {
        let isDuplicate = false;
        if(data.length){
            isDuplicate = true;
        }
        
        if (isDuplicate) {
            resolve("*중복된 닉네임 입니다.");
        } else {
            resolve("");
        }
    })
    .catch(error => {
        reject(error); // 에러가 발생한 경우
    });
});
}

export function checkDuplicateEmail(email){

    return new Promise((resolve,reject) => {
    fetch(`${BACKEND_IP_PORT}/user/email/${email}`)
    .then(response => response.json())
    .then(data => {
        let isDuplicate = false;
        if(data.length){
            isDuplicate = true;
        }
        
        if (isDuplicate) {
            resolve("*중복된 이메일 입니다.");
        } else {
            resolve("");
        }
    })
    .catch(error => {
        reject(error); // 에러가 발생한 경우
    });
});
}