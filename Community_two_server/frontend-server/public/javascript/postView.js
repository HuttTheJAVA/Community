const BACKEND_IP_PORT = "http://localhost:8081"

import {getUserIdFromSession} from './session.js';
import {getUser} from "./getUser.js"

function K_feature(feature){
    if(feature > 999){
        const feature_k = parseInt(feature/1000)
        return feature_k + "k";
    }
    return feature;
}

async function render_Post(){
    
    const result = {
        userId:''
    }

    await getUserIdFromSession(result);
    const userSessionId = result.userId;

    const userJsonData = await getUser(userSessionId); //배열 타입

    const user_profile_image = userJsonData[0].profileImage; //배열 타입이라서 인덱싱

    document.getElementById('user-image').style.backgroundImage = `url('/images/${user_profile_image}')`;

    const postId = window.location.pathname.split('/').pop();

    let replys;

    await fetch(`${BACKEND_IP_PORT}/post/${postId}`)
    .then(response => response.json())
    .then(data => {
    const jsonContainer = document.getElementById("post-view-container");
    jsonContainer.innerHTML = ''; // 기존에 있던 내용을 지웁니다.
    
    const post = data.post[0]; // 단일 json
    replys = data.replys; // array

    // 이제 jsonContainer안에 게시글 상세 사항들을 렌더링.
    const title = post["title"];
    const content = post["content"];
    const watch = K_feature(parseInt(post["watch"]));
    const reply = K_feature(parseInt(post["reply"]))
    const date = post["date"];
    const image = post["image"];
    const writer = post["nickname"];
    const userId = post["userId"];
    const writerImage = post["profileImage"];

    jsonContainer.innerHTML += `<div 
    class="feature-name-container bold litte-bottom-margin"
    style="font-size: 24px">
        ${title}
    </div>
    <div class="feature-name-container" style="margin-bottom: 25px">
        <div class="image-circle" style="margin-right: 10px">
            <img src="">
        </div>
        <div class="text-15px bold">${writer}</div>
        <div style="margin-left: 30px; font-size: 14px">
        ${date}
        </div>
        <div id="PostButton" class="flex-button margin-left">
        </div>
    </div>
    <div
        class="solid-line-1px-black litte-bottom-margin"
        style="margin-bottom: 20px">
    </div>

    <div class="img-container">
        <img src="/images/${image}" width=544px height=306px/>
    </div>
    <div class="post-message middle-bottom-margin">
        ${content}
    </div>
    <div class="post-feature-container">
        <div class="post-feature-box">
        <div>${watch}</div>
        <div>조회수</div>
        </div>

        <div class="post-feature-box">
        <div>${reply}</div>
        <div>댓글</div>
        </div>
    </div>
    <div
        class="solid-line-1px-black"
        style="margin-top: 20px; margin-bottom: 20px">
    </div>
    <div class="reply-write-box">
        <textarea id="comment-input" placeholder="댓글을 남겨주세요! (최대 500자)" style="margin-top: 15px" maxlength="500"></textarea>
    </div>
    <div class="solid-line-1px-black"></div>
    <div class="reply-submit-box middle-bottom-margin">
        <div id="reply-submit" class="custom-button" style="margin-top: 5px; margin-right: 5px">
        댓글 등록
        </div>
    </div>`;

    if(parseInt(userSessionId) === parseInt(userId)){
        const PostButton = document.getElementById("PostButton");
        PostButton.innerHTML += 
        `<div id=post-${postId} class="mini-button2" onclick="window.location.href = 'adjustPost/${postId}';">수정</div>
        <div id="delete-post-${postId}" class="mini-button" style="margin-left: 10px">삭제</div>`
    }

    const profileImagePath = post["profileImage"];

    const imageCircle = document.querySelector('.image-circle img');
    imageCircle.src = "/images/"+profileImagePath;

    document.getElementById("comment-input").addEventListener('input',activate_button);
    document.getElementById("reply-submit").addEventListener('click',submit_reply);
    });

    randerReplys(userSessionId,replys);
}

async function randerReplys(userSessionId,replys){
    
    const replyContainer = document.getElementById("post-view-container");

    for(const reply in replys){
        const userId = replys[reply]["userId"];
        const content = replys[reply]["content"];
        const date = replys[reply]["date"];
        const id = replys[reply]["id"];
        const profileImage = replys[reply]["profileImage"];

        const isCurrentUser = parseInt(userSessionId) === parseInt(userId);

        const writer = replys[reply]["nickname"];

        replyContainer.insertAdjacentHTML('beforeend',`
        <div class="reply-box">
            <div class="reply-box-left">
                <div class="reply-box-left-writer-info">
                    <div id="img-${userId}" class="user-image" style="margin-right: 10px; background-image: url('/images/${profileImage}')"></div>

                    <div class="bold">${writer}</div>
                    <div style="margin-left: 30px; font-size: 14px">
                    ${date}
                    </div>
                </div>
                <div class="reply-box-left-content">
                    <div id=${id} style="margin-left: 45px">${content}</div>
                </div>
            </div>
            ${isCurrentUser ? `
                        <div class="reply-box-update">
                            <div id="reply-adjust-${id}" class="reply-adjust-mini-button" onclick="adjustReply(${id})">수정</div>
                            <div id="reply-delete-${id}" class="reply-delete-mini-button" style="margin-left: 10px">삭제</div>
                        </div>
                    ` : ''}
        </div>`);
    }

    toast();
}

function toast(){
    
    //게시글에 대한
    const button_cancel = document.getElementById("cancel");
    const button_ok = document.getElementById("ok"); // 모달에 있는 ok를 말하는거 따라서 게시글 삭제버튼, 댓글 삭제 버튼 모두에 적용됨.
    const button_delete = document.getElementById("delete-post");

    //댓글에 대한
    const reply_adjust = document.getElementById("reply-adjust");
    const reply_delete = document.getElementById("reply-delete");

    addEventListener_mini_button('.reply-delete-mini-button','댓글을 삭제하시겠습니까?');
    addEventListener_mini_button('.mini-button','게시글을 삭제하시겠습니까?');
}

function activate_button(){
    const reply_text = document.getElementById("comment-input").value;
    const btn = document.getElementById("reply-submit");
    if(reply_text){
        btn.style.backgroundColor = "#7f6aee";
    }else{
        btn.innerText = "댓글 등록";
        btn.style.backgroundColor = "#aca0eb";
    }
}

function change_submit_button_text(){
    const button = document.getElementById('reply-submit');
    if(button.innerText == '댓글 수정'){
        button.innerText = '댓글 등록';
    }
}

function post_delete_message(title_text){
    const title = document.getElementById('toastTitle');
    const content = document.getElementById('toastContent');
    const button_ok = document.getElementById('ok');
    const button_cancel = document.getElementById('cancel');

    title.innerHTML = title_text;
    content.innerHTML = "삭제한 내용은 복구 할 수 없습니다.";
    button_ok.innerHTML = "확인";
    button_cancel.innerHTML = "취소";
}

function showReplyModal(text){
    document.getElementById("myModal").style.display = "block";
    post_delete_message(text);
    document.body.style.overflow = 'hidden';
}

// 댓글 입력 제출하면 댓글 수정인 경우 `${BACKEND_IP_PORT}/post/${postId}/reply/replyId로 Put 요청
async function submit_reply(){
    
    const btn = document.getElementById("reply-submit");

    if(btn.style.backgroundColor != "rgb(127, 106, 238)"){
        alert("내용을 입력하세요!");
        return;
    }

    const input_space = document.getElementById("comment-input");
    const input_text = document.getElementById("comment-input").value;
    const adjustButton = document.getElementById("reply-submit");
    const postId = window.location.pathname.split('/').pop();
    let fetchUrl = `${BACKEND_IP_PORT}/post/${postId}/reply`;
    let method = 'POST';
    let jsonData = {};

    // 현재 댓글을 수정 또는 작성한 유저가 누군지 확인
    var userSessionId = ''
    
    const result = {
        userId:''
    }

    await getUserIdFromSession(result);
    userSessionId = result.userId;
    //////////////////////////////////////////////

    if (adjustButton.textContent === '댓글 수정') {
        const replyId = adjustButton.dataset.replyId;
        fetchUrl += `/${replyId}`; // 수정할 댓글의 ID를 URL에 추가
        method = 'PUT'; // 수정할 때는 PUT 메서드 사용

        // 수정 내용만 보냄
        jsonData = {
            content: input_text
        }
    }else{ 
        jsonData = {
            userId: userSessionId,
            content: input_text
        };
    }

    await fetch(fetchUrl, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if(response.ok) {
            if (adjustButton.textContent === '댓글 수정') {
                alert("댓글 수정 완료!");
            } else {
                alert("댓글 등록 완료!");
            }
            input_space.value="";
            // 댓글 등록/수정 후에 페이지를 다시 불러옴
            render_Post();
        } else {
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    })
    change_submit_button_text();
}

async function addEventListener_mini_button(className,text){
    const postId = window.location.pathname.split('/').pop();
    const reply_delete_buttons = document.querySelectorAll(className);
    const modal = document.getElementById('myModal');
    const yesBtn = document.getElementById('ok');
    const noBtn = document.getElementById('cancel');
    reply_delete_buttons.forEach(delButton => {
        delButton.addEventListener('click',function (){
            const buttonId = delButton.id;
            showReplyModal(text);

            if(className.startsWith('.reply')){

                yesBtn.onclick = async function(){
                    // 여기서 백엔드 서버로 해당 id를 보내서 실제로 삭제하자.
                    // 그리고 게시글 삭제,수정,댓글 삭제 모두 다 구현하자.
                    const parts = buttonId.split("-");
                    const replyId = parseInt(parts[parts.length - 1]);

                    await fetch(`${BACKEND_IP_PORT}/post/${postId}/reply/${replyId}`,{method: 'DELETE'});

                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                    render_Post();
                }
            }
            else{ // 게시글 삭제 미니 버튼이라면
                yesBtn.onclick = async function(){
                    await fetch(`${BACKEND_IP_PORT}/post/${postId}`,{method: 'DELETE'})
                    .then(response => {
                        if(response.status === 204){
                            alert("게시글 삭제 완료!");
                            window.location.href = "/post";
                        }else{
                            alert("게시글 삭제 실패.");
                        }
                    })
                }
            }

            noBtn.onclick = function (){
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                  modal.style.display = 'none';
                }
            } 
        })
    })
}

window.onload = render_Post;