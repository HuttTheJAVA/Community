const BACKEND_IP_PORT = "http://localhost:8081"

import {getUserIdFromSession} from './session.js';
import { getUser } from './getUser.js';

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

    const result = {
        userId:''
    }
    await getUserIdFromSession(result); // 게시글을 쓰기전에 로그인 상태인지 확인

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    document.getElementById('postHelper').innerHTML = '';

    const input = document.getElementById('imageUpload');
    const file = input.files[0];
    const formData = new FormData();

    if(!file){
        document.getElementById('postHelper').innerHTML = "*이미지를 선택해주세요";
        return;
    }
    console.log("원본 파일명:"+file.name)
    const encodedFileName = encodeURIComponent("/post/"+file.name);
    formData.append('image',file,encodedFileName);
    console.log("encodedFileName:"+encodedFileName);

    if(!title || !content){
        document.getElementById('postHelper').innerHTML = "*제목,내용을 모두 작성해주세요"
    }else{

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

        const jsonData = {
            userId : result.userId,
            title: title,
            content: content,
            image : encodedFileName, 
        };
        console.log("저장 이후의 encodedFileName:"+jsonData.image);

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

    }
}

async function init_page(){
    let userId = '';
    const result = {
        userId:''
    }
    await getUserIdFromSession(result);
    userId = result.userId;

    const user = await getUser(userId);

    const imgPath = user[0].profileImage;

    document.getElementById('user-image').style.backgroundImage = `url('/images/${imgPath}')`;
}

document.getElementById("title").addEventListener('input',submitActivate);

document.getElementById("content").addEventListener('input',submitActivate);

document.getElementById("submit").addEventListener('click',checkValidation);

document.addEventListener('DOMContentLoaded',init_page);