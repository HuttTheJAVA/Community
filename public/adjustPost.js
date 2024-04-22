function render_Post(){
    const postId = window.location.pathname.split('/').pop();
    console.log(postId);
}

window.onload = render_Post;