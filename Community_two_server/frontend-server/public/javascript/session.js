const BACKEND_IP_PORT = "http://localhost:8081"

export async function getUserIdFromSession(result) {

    await fetch(`${BACKEND_IP_PORT}/user/session`, {credentials: 'include'})
        .then(response => response.json())
        .then(user => {
            if (user.userId !== '') {
                result.userId = user.userId;
            } else {
                alert('로그아웃 되었습니다 !');
                window.location.href = `/user/login`;
            }
        });
}