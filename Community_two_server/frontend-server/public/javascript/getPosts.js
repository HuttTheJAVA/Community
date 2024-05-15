// https로 할려고 했는데 SSL 인증서가 필요한듯 하다
//https 에러 메시지:https://localhost:8081/post net::ERR_SSL_PROTOCOL_ERROR
const BACKEND_IP_PORT = "http://localhost:8081"

import { getUserIdFromSession,isLogin } from "./session.js";
import {getUsers} from "./getUser.js"


function K_feature(feature){
    if(feature > 999){
        const feature_k = parseInt(feature/1000)
        return feature_k + "k";
    }
    return feature;
}

// 서버에서 JSON 데이터를 가져오는 AJAX 요청
fetch(`${BACKEND_IP_PORT}/post`)
    .then(response => response.json())
    .then(async data => {
    // JSON 데이터를 받아온 후 HTML에 렌더링
    const jsonContainer = document.getElementById('post-container');
    jsonContainer.innerHTML = ''; // 기존에 있던 내용을 지웁니다.
    
    const usersJsonData = await getUsers();
    
    const result = {
        userId:''
    }

    await isLogin(result);

    if(result.userId !== ''){
        const user_image = document.getElementById("user-image");

        const user_progile_image = usersJsonData[result.userId].profileImage;

        user_image.style.backgroundImage = `url('/images/${user_progile_image}')`;
    }

    // JSON 객체에 있는 모든 요소를 순회 하며 렌더링
    for (const postNum in data) { // key는 게시글 번호, value는 게시글 속성들이 있는 또다른 json
        
        let { id, userId, title, content, good, reply, watch, time, image } = data[postNum];

        good = K_feature(good);
        reply = K_feature(reply);
        watch = K_feature(watch);

        const writer = usersJsonData[userId]["nickname"];
        const imgPath = usersJsonData[userId]["profileImage"]

        jsonContainer.innerHTML += `
            <div class="post-preview card" onclick="redirectToPost(${id})">
                <div class="post-title">${title}</div>
                <div class="post-feature">
                    <div>좋아요 ${good}</div>
                    <div class="post-feature-area">댓글 ${reply}</div>
                    <div class="post-feature-area">조회수 ${watch}</div>
                    <div class="post-feature-right">${time}</div>
                    <div class="middleBig-bottom-margin"></div>
                </div>
                <div class="solid-line-1px-black"></div>
                <div class="container-row">
                <div class="image-circle">
                    <img src="/images/${imgPath}">
                </div>
                    <div class="left-margin bold" style="font-size: 15px">
                        ${writer}
                    </div>
                </div>
            </div>
        `;
        }
    
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

function checkLogin(){

    getUserIdFromSession({userId:''});

    window.location.href = '/post/create';
}

document.getElementById("createPost").addEventListener('click',checkLogin)