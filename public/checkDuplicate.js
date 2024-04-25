export function checkDuplicate(nickName){
    return new Promise((resolve,reject) => {
    fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        let isDuplicate = false;
        if(nickName in data){
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