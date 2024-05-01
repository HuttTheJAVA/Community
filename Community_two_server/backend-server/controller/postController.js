import model from '../model/postModel.js'

function getPosts(req,res){
    const postsJson = model.getPosts();

    res.json(postsJson);
}

function getPost(req,res){
    const post = model.getPost(req.params.postId);
    res.json(post);
}

function getReplys(req,res){
    const replys = model.getReplys(req.params.postId);
    res.json(replys);
}

function createReply(req,res){
    const postId = req.params.postId;
    const replyData = req.body;

    model.createReply(postId,replyData.writer,replyData.date,replyData.content);

    res.status(201).send('댓글 등록 완료');
}

function updateReply(req,res){
    const postId = req.params.postId;
    const replyId = req.params.replyId;
    const content = req.body.content;
    model.updateReply(postId,replyId,content);

    res.status(200).send();
}

export default {
    getPosts,
    getPost,
    getReplys,
    createReply,
    updateReply,
};