function K_feature(feature){
    if(feature > 999){
        feature_k = parseInt(feature/1000)
        return feature_k + "k";
    }
    return feature;
}

function render_Post(){
    const postId = window.location.pathname.split('/').pop();
    
    fetch(`/api/post/${postId}`)
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
            <img src="/api/user/${writer}">
        </div>
        <div class="text-15px bold">${writer}</div>
        <div style="margin-left: 30px; font-size: 14px">
        ${time}
        </div>
        <div class="flex-button margin-left">
            <div class="mini-button" onclick="window.location.href = '/adjustPost/${postId}';">수정</div>
            <div id="delete-post" class="mini-button" style="margin-left: 10px">삭제</div>
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
    document.getElementById("comment-input").addEventListener('input',activate_button)
    document.getElementById("reply-submit").addEventListener('click',submit_reply)
    });
    replys();
}

function replys(){
    const postId = window.location.pathname.split('/').pop();
    fetch(`/api/reply/${postId}`)
    .then(response => response.json())
    .then(data => {
        const replyContainer = document.getElementById("post-view-container");

        for(const reply in data){
            const writer = data[reply]["writer"];
            const content = data[reply]["content"];
            const time = data[reply]["time"];
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
                    <div id="reply-adjust-${id}" class="mini-button">수정</div>

                    <div id="reply-delete" class="mini-button" style="margin-left: 10px">삭제</div>
                </div>
            </div>`);

            const adjustButton = document.getElementById(`reply-adjust-${id}`);
            adjustButton.addEventListener('click',() => {
                const contentText = document.getElementById(`${id}`);
                const content = contentText.textContent.trim(); // 현재 내용 가져오기
                const comment_input = document.getElementById("comment-input");
                comment_input.value = content;
                const adjustButton = document.getElementById("reply-submit");
                adjustButton.textContent = "댓글 수정";
            })
        }
        toast();
    });
}

function toast(){
    
    //게시글에 대한
    const button_cancel = document.getElementById("cancel");
    const button_ok = document.getElementById("ok");
    const button_delete = document.getElementById("delete-post");

    //댓글에 대한
    const reply_adjust = document.getElementById("reply-adjust");
    const reply_delete = document.getElementById("reply-delete");

    function post_delete_message(title_text){
        const title = document.getElementById('toastTitle');
        const content = document.getElementById('toastContent');
        
        title.innerHTML = title_text;
        content.innerHTML = "삭제한 내용은 복구 할 수 없습니다.";
        button_ok.innerHTML = "확인";
        button_cancel.innerHTML = "취소";
    }
    
    function hideToast(){
        document.getElementById("myModal").style.display = "none";
        document.body.style.overflow = '';
    }

    function post_delete(){
        window.location.href = "/board";

        // display = none으로 안해주면 /board에서 이페이지로 다시 돌아오면 모달이 보여짐.
        // 근데 사실 이 버튼이 게시글 삭제, 댓글 삭제 공통으로 지금 적용된거라 버튼을 따로 분리하고 구현도 따로해야함.
        document.getElementById("myModal").style.display = "none";
    }

    function showPostModal() {
        document.getElementById("myModal").style.display = "block";
        post_delete_message("게시글을 삭제하시겠습니까?");
        document.body.style.overflow = 'hidden';
    }

    function showReplyModal(){
        document.getElementById("myModal").style.display = "block";
        post_delete_message("댓글을 삭제하시겠습니까?");
        document.body.style.overflow = 'hidden';
    }

    // deletePostButton.addEventListener('click', post_delete_message);
    button_cancel.addEventListener('click',hideToast);
    button_ok.addEventListener('click',post_delete); // 이거는 게시글, 댓글 구분이 안되니 각각에대해 다른 결과가 나오게 처리 (지금 이대로 하면 댓글 삭제 때 확인 누르면 /board로 가버림.)
    button_delete.addEventListener('click',showPostModal);

    reply_delete.addEventListener('click',showReplyModal);
    
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

function submit_reply(){
    const reply_text = document.getElementById("comment-input");
    reply_text.value="";
    alert("댓글 등록 완료!");    
}

window.onload = render_Post;