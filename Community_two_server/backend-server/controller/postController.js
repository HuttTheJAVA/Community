import model from '../model/postModel.js'

async function getPosts(req,res){
    const postsJson = await model.getPosts();

    res.json(postsJson);
}

function getPost(req,res){
    const post = model.getPost(req.params.postId);
    res.json(post);
}

function deletePost(req,res){
    const postId = req.params.postId;
    
    model.deletePost(postId);

    res.status(204).send("게시글 삭제 완료");
}

function getReplys(req,res){
    const replys = model.getReplys(req.params.postId);
    res.json(replys);
}

function createReply(req,res){
    const postId = req.params.postId;
    const replyData = req.body;

    model.createReply(postId,replyData.userId,replyData.date,replyData.content);

    res.status(201).send('댓글 등록 완료');
}

function updateReply(req,res){
    const postId = req.params.postId;
    const replyId = req.params.replyId;
    const content = req.body.content;
    model.updateReply(postId,replyId,content);

    res.status(200).send();
}

function updatePost(req,res){
    const postId = req.params.postId;
    const post = {
        title : req.body.title,
        content : req.body.content,
        imageName : req.body.imageName,
    }
    model.updatePost(post,postId);
    res.status(204).send('update_success');
}

function deleteReply(req,res){
    const postId = req.params.postId;
    const replyId = req.params.replyId;
    model.deleteReply(postId,replyId);
    res.status(204).send('delete_success');
}

function createPost(req,res){
    const Body = req.body
    const post = {
        userId : Body.userId,
        title : Body.title,
        content : Body.content,
        good : Body.good,
        reply : Body.reply,
        watch : Body.watch,
        time : Body.time,
        image : Body.image,
    }
    model.createPost(post);
    res.status(201).send("create_success");
}

export default {
    getPosts,
    getPost,
    getReplys,
    createReply,
    updateReply,
    updatePost,
    deleteReply,
    deletePost,
    createPost,
};