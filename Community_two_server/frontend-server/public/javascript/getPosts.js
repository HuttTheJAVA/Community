// https로 할려고 했는데 SSL 인증서가 필요한듯 하다
//https 에러 메시지:https://localhost:8081/post net::ERR_SSL_PROTOCOL_ERROR
BACKEND_IP_PORT = "http://localhost:8081"

function redirectToPost(postId) {
    // postId를 사용하여 URL을 생성합니다.
    // const url = `${BACKEND_IP_PORT}/post/${postId}`; // 예시 URL, postId에 따라서 동적으로 생성해야 합니다
    const url = `/post/${postId}`;

    // 페이지를 새 URL로 리디렉션합니다.
    window.location.href = url;
}

function K_feature(feature){
    if(feature > 999){
        feature_k = parseInt(feature/1000)
        return feature_k + "k";
    }
    return feature;
}

// 서버에서 JSON 데이터를 가져오는 AJAX 요청
fetch(`${BACKEND_IP_PORT}/post`)
    .then(response => response.json())
    .then(data => {
    // JSON 데이터를 받아온 후 HTML에 렌더링
    const jsonContainer = document.getElementById('post-container');
    jsonContainer.innerHTML = ''; // 기존에 있던 내용을 지웁니다.
    
    // JSON 객체에 있는 모든 요소를 순회 하며 렌더링
    for (const postNum in data) { // key는 게시글 번호, value는 게시글 속성들이 있는 또다른 json
        const feature_json = data[postNum] // 단일 게시글 속성 json
        const post_id = feature_json["id"]
        const title = feature_json["title"]
        const good = K_feature(parseInt(feature_json["good"]))
        const reply = K_feature(parseInt(feature_json["reply"]))
        const watch = K_feature(parseInt(feature_json["watch"]))
        const time = feature_json["time"]
        const writer = feature_json["writer"]
        
        jsonContainer.innerHTML += `
            <div class="post-preview card" onclick="redirectToPost(${post_id})">
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
                    <img src="/images/${writer}.png">
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