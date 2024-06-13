const BACKEND_IP_PORT = "http://localhost:8081"

import {getUserIdFromSession} from './session.js';
import {getUser} from './getUser.js'

async function render_Post(){
    const postId = window.location.pathname.split('/').pop();
    
    var userSessionId = ''

    const result = {
        userId:''
    }

    await getUserIdFromSession(result);
    userSessionId = result.userId;

    const user = await getUser(userSessionId);

    const profileImage = user[0].profileImage;

    document.getElementById('user-image').style.backgroundImage = `url('/images/${profileImage}')`;

    await fetch(`${BACKEND_IP_PORT}/post/${postId}`)
    .then(response => response.json())
    .then(data => {
        var titleElement = document.getElementById("title");
        var contentAreaElement = document.getElementById("content-area");
        titleElement.value = '';
        contentAreaElement.value = '';
    
        const post = data.post[0];

        // 이제 jsonContainer안에 게시글 상세 사항들을 렌더링.
        const title = post["title"];
        const content = post["content"];
        
        titleElement.value = title;
        contentAreaElement.value = content;
    });
}

async function adjust(){

    const postId = window.location.pathname.split('/').pop();

    var userNickname = ''

    const result = {
        nickname:''
    }

    await getUserIdFromSession(result);

    userNickname = result.nickname;

    const title = document.getElementById('title').value;
    const content = document.getElementById('content-area').value;

    if(!title && !content){
        alert("내용을 입력하세요!");
        return;
    }

    const input = document.getElementById('imageUpload');
    const file = input.files[0];
    const formData = new FormData();

    // 한글 파일명을 encodeURIComponent() 함수를 사용하여 인코딩
    const encodedFileName = encodeURIComponent(file.name);
    formData.append('image',file,encodedFileName);

    fetch('/upload',{
        method: 'POST',
        body: formData,
    }).then(response => {
            if(response.ok){
                console.log("이미지 성공적으로 업로드.");
            }else{
                console.error("이미지 업로드 오류 발생");
            }
        })
        .catch(error => {
            console.error('네트워크 오류:',error);
        });

    
    const obj ={
        title:title,
        content:content,
        imageName:encodedFileName
    }

    const data = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }
        
    await fetch(`${BACKEND_IP_PORT}/post/${postId}`,data)
    .then(response =>{
        if(response.status === 204){
            alert("게시글이 수정되었습니다.");
        }else{
            alert("게시글 수정 실패.");
        }
        window.location.href = `/post/${postId}`;
    })
    .catch(error => {
        console.error('fetch error:',error);
    });

    window.location.href = `/post/${postId}`;
}

const adjust_btn = document.getElementById("adjust");

adjust_btn.addEventListener('click',adjust);

window.onload = render_Post;