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
        const res = await fetch(`${BACKEND_IP_PORT}/user/${userId}`);
        const user = await res.json();
        return user;
    } catch (err) {
        console.error(err);
        throw err; // 에러를 호출자에게 다시 전파
    }
}
