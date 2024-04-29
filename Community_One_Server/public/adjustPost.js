function render_Post(){
    const postId = window.location.pathname.split('/').pop();
    
    fetch(`/api/post/${postId}`)
    .then(response => response.json())
    .then(data => {
        var titleElement = document.getElementById("title");
        var contentAreaElement = document.getElementById("content-area");
        titleElement.value = '';
        contentAreaElement.value = '';
    
        // 이제 jsonContainer안에 게시글 상세 사항들을 렌더링.
        const title = data["title"];
        const content = data["content"];
        
        titleElement.value = title;
        contentAreaElement.value = content;
    });

    const adjust_btn = document.getElementById("adjust");
    adjust_btn.addEventListener('click',function(){

        // TODO: 여기에 실제 게시글을 수정하는 로직이 들어가야 함. 
        
        window.location.href = `/post/${postId}`;
    })
}

window.onload = render_Post;