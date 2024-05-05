const BACKEND_IP_PORT = "http://localhost:8081"

import {getUserIdFromSession} from './session.js';

function K_feature(feature){
    if(feature > 999){
        const feature_k = parseInt(feature/1000)
        return feature_k + "k";
    }
    return feature;
}

async function render_Post(){

    var userNickname = ''
    
    const result = {
        nickname:''
    }

    await getUserIdFromSession(result);
    userNickname = result.nickname;

    document.getElementById('user-image').style.backgroundImage = `url('/images/${userNickname}.png')`;

    const postId = window.location.pathname.split('/').pop();
    
    await fetch(`${BACKEND_IP_PORT}/post/${postId}`)
    .then(response => response.json())
    .then(data => {
    const jsonContainer = document.getElementById("post-view-container");
    jsonContainer.innerHTML = ''; // 기존에 있던 내용을 지웁니다.
    
    // 이제 jsonContainer안에 게시글 상세 사항들을 렌더링.
    const title = data["title"];
    const writer = data["writer"];
    const content = data["content"];
    const good = data["good"];
    const reply = K_feature(parseInt(data["reply"]));
    const watch = K_feature(parseInt(data["watch"]));
    const time = data["time"];
    const image = data["image"];

    jsonContainer.innerHTML += `<div 
    class="feature-name-container bold litte-bottom-margin"
    style="font-size: 24px">
        ${title}
    </div>
    <div class="feature-name-container" style="margin-bottom: 25px">
        
        <div class="image-circle" style="margin-right: 10px">
            <img src="/images/${writer}.png">
        </div>
        <div class="text-15px bold">${writer}</div>
        <div style="margin-left: 30px; font-size: 14px">
        ${time}
        </div>
        <div id="PostButton" class="flex-button margin-left">
        </div>
    </div>
    <div
        class="solid-line-1px-black litte-bottom-margin"
        style="margin-bottom: 20px">
    </div>

    <div class="img-container">
        <img src="/${image}" width=544px height=306px/>
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
        <textarea id="comment-input" placeholder="댓글을 남겨주세요!" style="margin-top: 15px"></textarea>
    </div>
    <div class="solid-line-1px-black"></div>
    <div class="reply-submit-box middle-bottom-margin">
        <div id="reply-submit" class="custom-button" style="margin-top: 5px; margin-right: 5px">
        댓글 등록
        </div>
    </div>`;

    if(userNickname === writer){
        const PostButton = document.getElementById("PostButton");
        PostButton.innerHTML += 
        `<div class="mini-button" onclick="window.location.href = 'adjustPost/${postId}';">수정</div>
        <div id="delete-post" class="mini-button" style="margin-left: 10px">삭제</div>`
    }

    document.getElementById("comment-input").addEventListener('input',activate_button)
    document.getElementById("reply-submit").addEventListener('click',submit_reply)
    document.getElementById("reply-submit").addEventListener('click',change_submit_button_text)
    document.getElementById("reply-submit").addEventListener('click', submit_reply)
    });
    replys();
}

async function replys(){
    const postId = window.location.pathname.split('/').pop();
    await fetch(`${BACKEND_IP_PORT}/post/${postId}/reply`)
    .then(response => response.json())
    .then(data => {
        const replyContainer = document.getElementById("post-view-container");

        for(const reply in data){
            const writer = data[reply]["writer"];
            const content = data[reply]["content"];
            const time = data[reply]["date"];
            const id = data[reply]["id"];

            replyContainer.insertAdjacentHTML('beforeend',`
            <div class="reply-box">
                <div class="reply-box-left">
                    <div class="reply-box-left-writer-info">
                        <div class="image-circle" style="margin-right: 10px"></div>

                        <div class="bold">${writer}</div>
                        <div style="margin-left: 30px; font-size: 14px">
                        ${time}
                        </div>
                    </div>
                    <div class="reply-box-left-content">
                        <div id=${id} style="margin-left: 45px">${content}</div>
                    </div>
                </div>
                <div class="reply-box-update">
                    <div id="reply-adjust-${id}" class="reply-adjust-mini-button" onclick="adjustReply(${id})">수정</div>

                    <div id="reply-delete-${id}" class="reply-delete-mini-button" style="margin-left: 10px">삭제</div>
                </div>
            </div>`);
        }
    });
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
    
    function hideToast(){
        document.getElementById("myModal").style.display = "none";
        document.body.style.overflow = '';
    }

    function deleteOk(){ // 게시글의 삭제 버튼일 경우 ID는 POSTID, 댓글 삭제의 경우 ID는 replyId
        const context = document.getElementById("toastTitle").innerText;
        if(context == '게시글을 삭제하시겠습니까?'){
            window.location.href = "/board";
            document.getElementById("myModal").style.display = "none";
        }
        else{
            document.getElementById("myModal").style.display = "none";
            alert("댓글 삭제 완료!");
            document.body.style.overflow = ''; 
        }

        // display = none으로 안해주면 /board에서 이페이지로 다시 돌아오면 모달이 보여짐.
        // 근데 사실 이 버튼이 게시글 삭제, 댓글 삭제 공통으로 지금 적용된거라 버튼을 따로 분리하고 구현도 따로해야함.
    }

    addEventListener_reply_button();

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

function showReplyModal(){
    document.getElementById("myModal").style.display = "block";
    post_delete_message("댓글을 삭제하시겠습니까?");
    document.body.style.overflow = 'hidden';
}

function showPostModal() {
    document.getElementById("myModal").style.display = "block";
    post_delete_message("게시글을 삭제하시겠습니까?");
    document.body.style.overflow = 'hidden';
}

function adjustReply(replyId){
    const contentText = document.getElementById(replyId);
    const content = contentText.textContent.trim(); // 현재 내용 가져오기
    const comment_input = document.getElementById("comment-input");
    comment_input.value = content;
    const adjustButton = document.getElementById("reply-submit");
    adjustButton.style.backgroundColor = "#7f6aee";
    adjustButton.textContent = "댓글 수정";
    adjustButton.dataset.replyId = replyId; // 댓글 수정 버튼의 데이터 속성에 댓글 ID 저장
}

// 댓글 입력 제출하면 댓글 수정인 경우 `${BACKEND_IP_PORT}/post/${postId}/reply/replyId로 Put 요청
function submit_reply(){
    const btn = document.getElementById("reply-submit");
    if(btn.style.backgroundColor != "rgb(127, 106, 238)"){
        alert("내용을 입력하세요!");
        return;
    }
    const reply_text = document.getElementById("comment-input").value;
    const adjustButton = document.getElementById("reply-submit");
    const postId = window.location.pathname.split('/').pop();
    let fetchUrl = `${BACKEND_IP_PORT}/post/${postId}/reply`;
    let method = 'POST';
    let jsonData = {};

    if (adjustButton.textContent === '댓글 수정') {
        const replyId = adjustButton.dataset.replyId;
        fetchUrl += `/${replyId}`; // 수정할 댓글의 ID를 URL에 추가
        method = 'PUT'; // 수정할 때는 PUT 메서드 사용

        jsonData = {
            content: reply_text
        }
    }else{

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2,'0');
        const day = String(now.getDate()).padStart(2,'0');
        const formattedDate = `${year}-${month}-${day}`;

        jsonData = {
            writer: "andrew", // 해당값은 사실 지금 로그인 된 사용자의 닉네임이 들어가야함. 이 부분은 세션때 구현하자
            date: formattedDate,
            content: reply_text
        };
    }

    fetch(fetchUrl, {
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
            reply_text.value="";
            // 댓글 등록/수정 후에 페이지를 다시 불러옴
            render_Post();
        } else {
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    })
}

function addEventListener_reply_button(){
    const reply_delete_buttons = document.querySelectorAll('.reply-delete-mini-button');
    const modal = document.getElementById('myModal');
    const yesBtn = document.getElementById('ok');
    const noBtn = document.getElementById('cancel');
    reply_delete_buttons.forEach(delButton => {
        delButton.addEventListener('click',function (){
            const buttonId = delButton.id;
            showReplyModal();

            yesBtn.onclick = function(){
                console.log(buttonId); // 참고로 buttonId=reply-delete-3 이런식이라 파싱해야함.
                // 여기서 백엔드 서버로 해당 id를 보내서 실제로 삭제하자.
                // 그리고 게시글 삭제,수정,댓글 삭제 모두 다 구현하자.
                modal.style.display = 'none';
            }

            noBtn.onclick = function (){
                modal.style.display = 'none';
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