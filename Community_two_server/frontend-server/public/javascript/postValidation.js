const BACKEND_IP_PORT = "http://localhost:8081"

import {getUserIdFromSession} from './session.js';

function submitActivate(){
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const submitButton = document.getElementById("submit")
    if(title && content){
        submitButton.style.backgroundColor = "#7F6AEE";
    }else{
        submitButton.style.backgroundColor = "#ACA0EB";
    }
}

async function checkValidation(){

    getUserIdFromSession({nickname:''}); // 게시글을 쓰기전에 로그인 상태인지 확인

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const good = Math.floor(Math.random() * 500) + 1;
    const reply = Math.floor(Math.random() * 30) + 1;
    const watch = Math.floor(Math.random() * 2000) + 1;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2,'0');
    const day = String(now.getDate()).padStart(2,'0');
    const formattedDate = `${year}-${month}-${day}`;

    document.getElementById('postHelper').innerHTML = '';

    const input = document.getElementById('imageUpload');
    const file = input.files[0];
    const formData = new FormData();

    if(!file){
        document.getElementById('postHelper').innerHTML = "*이미지를 선택해주세요";
        return;
    }

    const encodedFileName = encodeURIComponent(file.name);
    formData.append('image',file,encodedFileName);

    var userNickname = ''

    const result = {
        nickname:''
    }

    await getUserIdFromSession(result); // 게시글 게시하기 전에 세션이 만료되거나 현재 로그인 상태인지 확인

    userNickname = result.nickname;

    console.log("접속된 유저 닉네임은 :",userNickname)

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

    if(!title || !content){
        document.getElementById('postHelper').innerHTML = "*제목,내용을 모두 작성해주세요"
    }else{
        const jsonData = {
            title: title,
            content: content,
            good : good,
            reply : reply,
            watch : watch,
            time : formattedDate,
            image : encodedFileName, 
            writer : userNickname,
        };

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        }

        await fetch(`${BACKEND_IP_PORT}/post/create`,data)
        .then(response => {
            if(response.status === 201){
                alert("게시글 등록완료!");
            }else{
                alert("게시글 등록 실패.");
            }
            window.location.href = '/post';
        })

        // 이 코드는 백엔드 서버에서 구현하자.
        // fetch('/saveData',{
        //     method: 'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify(jsonData)
        // })
        // .then(response=>response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
    }
}

document.getElementById("title").addEventListener('input',submitActivate);

document.getElementById("content").addEventListener('input',submitActivate);

document.getElementById("submit").addEventListener('click',checkValidation);