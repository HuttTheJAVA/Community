const BACKEND_IP_PORT = "http://localhost:8081"

export async function getUserIdFromSession(result) {

    await fetch(`${BACKEND_IP_PORT}/user/session`, {credentials: 'include'})
        .then(response => response.json())
        .then(user => {
            if (user.nickname !== '') {
                result.nickname = user.nickname;
                console.log("세션 user.nickname은:",user.nickname)
            } else {
                alert('로그아웃 되었습니다 !');
                window.location.href = `/user/login`;
            }
        });
}