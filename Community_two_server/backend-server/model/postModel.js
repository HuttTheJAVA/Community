import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

function getPosts(){
    const postJsonFile = fs.readFileSync(__dirname + '/model/repository/posts.json','utf8');
    const postsJsonData = JSON.parse(postJsonFile);

    return postsJsonData;
}

function getPost(postId){
    const postJsonFile = fs.readFileSync(__dirname + '/model/repository/posts.json','utf8');
    const postsJsonData = JSON.parse(postJsonFile);

    const post = postsJsonData[postId];

    if (!post) {
        // postId에 해당하는 게시물이 없는 경우
        throw new Error("게시물을 찾을 수 없습니다.");
    }

    return post;
}

function getReplys(postId){
    const replysJsonFile = fs.readFileSync(__dirname + '/model/repository/reply.json','utf8');
    const replysJsonData = JSON.parse(replysJsonFile);

    const postIdReplys = replysJsonData[postId];

    return postIdReplys;
}

function createReply(postId,writer,date,content){
    let replysJsonData = fs.readFileSync(__dirname + '/model/repository/reply.json','utf8');
    replysJsonData = JSON.parse(replysJsonData);
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
    fs.writeFileSync(__dirname + '/model/repository/reply.json',data,'utf8')
}

function updateReply(postId,replyId,content){
    let replysJsonData = fs.readFileSync(__dirname + '/model/repository/reply.json','utf8');
    replysJsonData = JSON.parse(replysJsonData);

    for(const reply in replysJsonData[postId]){
        if(replysJsonData[postId][reply]["id"] == parseInt(replyId)){
            replysJsonData[postId][reply]["content"] = content;
        }
    }
    
    const data = JSON.stringify(replysJsonData,null,2);
    fs.writeFileSync(__dirname + '/model/repository/reply.json',data,'utf8')
}

export default {
    getPosts,
    getPost,
    getReplys,
    createReply,
    updateReply,
};