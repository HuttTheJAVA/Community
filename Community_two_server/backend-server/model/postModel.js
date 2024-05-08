import fs from 'fs';
import path, { parse } from 'path';

const __dirname = path.resolve();

const postJsonDir = '/model/repository/posts.json'
const replyJsonDir = '/model/repository/reply.json'

function readJson(sub_dir,encodeStyle){
    const JsonFile = fs.readFileSync(__dirname + sub_dir,encodeStyle);
    const JsonData = JSON.parse(JsonFile);
    
    return JsonData;
}

function getPosts(){
    return readJson(postJsonDir,'utf8');
}

function getPost(postId){
    const postsJsonData = readJson(postJsonDir,'utf8');

    const post = postsJsonData[postId];
    
    if (!post) {
        // postId에 해당하는 게시물이 없는 경우
        throw new Error("게시물을 찾을 수 없습니다.");
    }

    return post;
}

function createPost(post){
    const postsJsonData = readJson(postJsonDir,'utf8');

    let maxId = -1;

    for(let key in postsJsonData){
        if(parseInt(key)>maxId){
            maxId = parseInt(key);
        }
    }

    const postJson = {
        "id":maxId+1,
        "title":post.title,
        "content":post.content,
        "good":post.good,
        "reply":post.reply,
        "watch":post.watch,
        "time":post.time,
        "image":"images/"+post.image,
        "writer":post.writer,
    }

    postsJsonData[postJson.id.toString()] = postJson;

    const updatePostsJson = JSON.stringify(postsJsonData);

    fs.writeFileSync(path.join(__dirname,postJsonDir),updatePostsJson);
}

function updatePost(post,postId){
    const postsJsonData = readJson(postJsonDir,'utf8');

    for(const key in postsJsonData){
        if(parseInt(postId) === parseInt(key)){
            postsJsonData[key]["title"] = post.title;
            postsJsonData[key]["content"] = post.content;
            postsJsonData[key]["image"] = 'images/'+post.imageName;
        }
    }

    const updatePostsJsonData = JSON.stringify(postsJsonData);
    fs.writeFileSync(path.join(__dirname,postJsonDir),updatePostsJsonData);
}

function deletePost(postId){

    const postsJsonData = readJson(postJsonDir,'utf8');

    for(let key in postsJsonData){
        if(parseInt(key) === parseInt(postId)){
            delete postsJsonData[key];
            break;
        }
    }

    deletePostReplys(postId);

    const updatePostsJsonData = JSON.stringify(postsJsonData);

    fs.writeFileSync(path.join(__dirname,postJsonDir),updatePostsJsonData);
}

function getReplys(postId){
    const replysJsonData = readJson(replyJsonDir,'utf8');

    let postIdReplys = [];

    if(postId in replysJsonData){
        postIdReplys = replysJsonData[postId];
    }

    return postIdReplys;
}

function createReply(postId,writer,date,content){
    let replysJsonData = readJson(replyJsonDir,'utf8');

    let maxId = 0;
    for (const key in replysJsonData){
        const replies = replysJsonData[key];
        for (const reply in replies){
            if(replies[reply]["id"] > maxId){
                maxId = replies[reply]["id"];
            }
        }
    }

    const newReply = {
        "id":maxId+1,
        "writer":writer,
        "date":date,
        "content":content
    }
    let postIdReplys = [];
    if(postId in replysJsonData){
        postIdReplys = replysJsonData[postId];
    }else{
        replysJsonData[postId] = [];
        postIdReplys = replysJsonData[postId];
    }

    postIdReplys.push(newReply);

    const data = JSON.stringify(replysJsonData,null,2);
    fs.writeFileSync(__dirname + replyJsonDir,data,'utf8')
}

function updateReply(postId,replyId,content){
    let replysJsonData = readJson(replyJsonDir,'utf8');

    for(const reply in replysJsonData[postId]){
        if(replysJsonData[postId][reply]["id"] == parseInt(replyId)){
            replysJsonData[postId][reply]["content"] = content;
        }
    }
    
    const data = JSON.stringify(replysJsonData,null,2);
    fs.writeFileSync(__dirname + replyJsonDir,data,'utf8')
}

function deleteReply(postId,replyId){
    let replysJsonData = readJson(replyJsonDir,'utf8');
    
    let postReplysArray = [];

    for(let i = 0; i<replysJsonData[postId].length;i++){
        if(replysJsonData[postId][i]["id"] !== parseInt(replyId)){
            postReplysArray.push(replysJsonData[postId][i]);
        }
    }
    replysJsonData[postId] = postReplysArray;

    const data = JSON.stringify(replysJsonData,null,2);
    
    fs.writeFileSync(__dirname + replyJsonDir,data,'utf8')
}

function deletePostReplys(postId){
    let replysJsonData = readJson(replyJsonDir,'utf8');

    for(let key in replysJsonData){
        if(parseInt(key) === parseInt(postId)){
            delete replysJsonData[key];
            break;
        }
    }

    const updateReplysJsonData = JSON.stringify(replysJsonData,null,2);

    fs.writeFileSync(__dirname + replyJsonDir,updateReplysJsonData,'utf8')
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