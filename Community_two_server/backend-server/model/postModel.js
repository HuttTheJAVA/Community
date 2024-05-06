import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const postJsonDir = '/model/repository/posts.json'
const replyJsonDir = '/model/repository/reply.json'

function readJson(sub_dir,encodeStyle){
    const JsonFile = fs.readFileSync(__dirname + sub_dir,encodeStyle);
    const JsonData = JSON.parse(JsonFile);
    
    return JsonData;
}

function getPosts(){
    // const postsJsonFile = fs.readFileSync(__dirname + postJsonDir,'utf8');
    // const postsJsonData = JSON.parse(postsJsonFile);
    // return postsJsonData;

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

function getReplys(postId){
    const replysJsonData = readJson(replyJsonDir,'utf8');

    const postIdReplys = replysJsonData[postId];

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

    const postIdReplys = replysJsonData[postId];

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
    
    // for(const reply in replysJsonData[postId]){
    //     if(replysJsonData[postId][reply]["id"] === parseInt(replyId)){
    //         replysJsonData[postId].remove(reply)
    //         break
    //     }
    // }

    let postReplysArray = [];

    for(let i = 0; i<replysJsonData[postId].length;i++){
        console.log('yeye')
        if(replysJsonData[postId][i]["id"] !== parseInt(replyId)){
            postReplysArray.push(replysJsonData[postId][i]);
        }else{
            console.log("delete!")
        }
    }
    replysJsonData[postId] = postReplysArray;

    const data = JSON.stringify(replysJsonData,null,2);
    
    fs.writeFileSync(__dirname + replyJsonDir,data,'utf8')
}

export default {
    getPosts,
    getPost,
    getReplys,
    createReply,
    updateReply,
    updatePost,
    deleteReply,
};