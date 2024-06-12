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

// 유저의 프로필 사진을 유지하기 위한 메소드 (비로그인 상태여도 로그인을 요구하지 않음.)
export async function isLogin(result) {

    await fetch(`${BACKEND_IP_PORT}/user/session`, {credentials: 'include'})
        .then(response => response.json())
        .then(user => {
            if (user.userId !== '') {
                result.userId = user.userId;
            }
        });
}