const BACKEND_IP_PORT = "http://localhost:8081"

export function getUsers(){
    return fetch(`${BACKEND_IP_PORT}/user`)
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.error(err);
    });
}

export async function getUser(userId){
    try {
        console.log("url에 들어가는 userId:",userId);
        const res = await fetch(`${BACKEND_IP_PORT}/user/${userId}`);
        const user = await res.json();
        console.log("반환된 유저:",user);
        return user;
    } catch (err) {
        console.error(err);
        throw err; // 에러를 호출자에게 다시 전파
    }
}
