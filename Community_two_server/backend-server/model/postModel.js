import postDAO from './repository/postDAO.js';

async function getPosts(){
    const posts = await postDAO.getPosts();
    return posts;
}

async function getPost(postId){
    
    const post = await postDAO.getPost(postId);

    if (post === null) {
        // postId에 해당하는 게시물이 없는 경우
        throw new Error("게시물을 찾을 수 없습니다.");
    }

    return post;
}

function createPost(post){
    postDAO.createPost(post);
}

function updatePost(post){
    postDAO.updatePost(post);
}

function deletePost(postId){
    postDAO.deletePost(postId);
}

function createReply(postId,userId,content){

    const newReply = {
        "postId":postId,
        "userId":userId,
        "content":content,
    }

    postDAO.createReply(newReply);
}

function updateReply(replyId,content){
    const updateReply = {
        "replyId":replyId,
        "content":content,
    }

    postDAO.updateReply(updateReply)
}

function deleteReply(replyId){
    postDAO.deleteReply(replyId);
}

export default {
    getPosts,
    getPost,
    createReply,
    updateReply,
    updatePost,
    deleteReply,
    deletePost,
    createPost,
};