function K_feature(feature){
    if(feature > 999){
        feature_k = parseInt(feature/1000)
        return feature_k + "k";
    }
    return feature;
}

function render_Post(){
    const postId = window.location.pathname.split('/').pop();
    console.log(postId);
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

    jsonContainer.innerHTML += `<div 
    class="feature-name-container bold litte-bottom-margin"
    style="font-size: 24px">
        ${title}
    </div>
    <div class="feature-name-container" style="margin-bottom: 25px">
        
        <div class="image-circle" style="margin-right: 10px"></div>
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
        <img src="earth.jpg" />
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
        <textarea
        placeholder="댓글을 남겨주세요!"
        style="margin-top: 15px">
        </textarea>
    </div>
    <div class="solid-line-1px-black"></div>
    <div class="reply-submit-box middle-bottom-margin">
        <div class="custom-button" style="margin-top: 5px; margin-right: 5px">
        댓글 등록
        </div>
    </div>`;
    toast();
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
                        <div style="margin-left: 45px">${content}</div>
                    </div>
                </div>
                <div class="reply-box-update">
                    <div class="mini-button">수정</div>

                    <div class="mini-button" style="margin-left: 10px">삭제</div>
                </div>
            </div>`);
        }
    });
}

function toast(){

    const deletePostButton = document.getElementById('delete-post');
    const button_cancel = document.getElementById("cancel");
    const button_ok = document.getElementById("ok");


    function post_delete_message(){
    const toastMessage = document.getElementById('toastMessage');

    const title = document.getElementById('toastTitle');
    const content = document.getElementById('toastContent');
    
    title.innerHTML="게시글을 삭제하시겠습니까?";
    content.innerHTML="삭제한 내용은 복구 할 수 없습니다.";
    button_ok.innerHTML="확인";
    button_cancel.innerHTML="취소";
    toastMessage.style.opacity = 1;
    document.getElementById('toastMessage').classList.remove('hidden');
    }

    function hideToast(){
    toastMessage.style.opacity = 0;
    }

    function post_delete(){
    window.location.href = "/board";
    }

    deletePostButton.addEventListener('click', post_delete_message);
    button_cancel.addEventListener('click',hideToast);
    button_ok.addEventListener('click',post_delete);
}

window.onload = render_Post;