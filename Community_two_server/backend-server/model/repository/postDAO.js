import {connection,sendQuery} from "./dbConnect.js";

const getPosts = async () => {
    const sql = "select posts.id, title, content, good, reply, watch, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date, image, users.id as userId,nickname,profileImage from posts left join users on posts.userId = users.id ORDER BY date;";
    const values = [];

    return sendQuery(sql,values);
}

const getPost = async (postId) => {
    const selectPostSQL = "SELECT userId,title,content,good,reply,watch,DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date,image,nickname,profileImage FROM posts as p left join users as u on p.userId=u.id WHERE p.id = ?";

    const updatePostWatchSQL = "UPDATE posts SET watch = watch + 1 WHERE id = ?";

    const postReplySQL = "select r.id,userId,DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date,content,nickname,profileImage from replys as r left join users u on r.userId=u.id where r.postId = ? ORDER BY date";

    return new Promise( async (resolve,reject) => {
        connection.beginTransaction();
        let post;
        let replys;

        try{
            // post 조회 수 갱신
            await new Promise ((resolve,reject) => {
                connection.execute(updatePostWatchSQL,[postId],(err,result) => {
                    if(err){
                        connection.rollback();
                        reject(err);
                    }
                    resolve();
                })
            });

            // post 쿼리로 호출
            post = await new Promise ((resolve,reject) => {
                connection.execute(selectPostSQL,[postId],(err,result) => {
                    if(err){
                        connection.rollback();
                        reject(err);
                    }
                    resolve(result);
                })
            });

            // post 댓글 수집
            replys = await new Promise ((resolve,reject) => {
                connection.execute(postReplySQL,[postId],(err,result) => {
                    if(err){
                        connection.rollback();
                        reject(err);
                    }
                    resolve(result);
                })
            });

        }catch (err){
            connection.rollback();
            reject(err);
        }

        connection.commit();

        if(post.length === 0){
            resolve(null);
        }

        const result = {
            post : post,
            replys : replys
        };

        resolve(result);
    });
}

const updatePost = async (post) => {
    const sql = "UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?";
    const values = [post.title,post.content,post.imageName,post.id];

    return sendQuery(sql,values);
}

const deletePost = async (postId) => {
    const sql = "DELETE FROM posts WHERE id = ?";
    const values = [postId];

    return sendQuery(sql,values);
}

const deleteUserIdPost = async (userId) => {
    const sql = "DELETE FROM posts WHERE userId = ?";
    const values = [userId];

    return sendQuery(sql,values);
}

const createPost = async (post) => {
    const sql = "INSERT INTO posts (userId,title,content,image) VALUES (?,?,?,?)";
    const values = [post.userId,post.title,post.content,post.image];

    return sendQuery(sql,values);
}

const createReply = async (reply) => {
    const sql = "INSERT INTO replys (postId,userId,content) VALUES (?,?,?)";
    const values = [reply.postId,reply.userId,reply.content];

    return sendQuery(sql,values);
}

const deleteReply = async (replyId) => {
    const sql = "DELETE FROM replys WHERE id = ?";
    const values = [replyId];

    return sendQuery(sql,values);
}

const deleteUserIdReplys = async (userId) => {
    const sql = "DELETE FROM replys WHERE userId = ?";
    const values = [userId];

    return sendQuery(sql,values);
}

const updateReply = async (reply) => {
    const sql = "UPDATE replys SET content = ? WHERE id = ?";
    const values = [reply.content,reply.replyId];

    return sendQuery(sql,values);
} 

const getReplys = async () => {
    const sql = "SELECT postId,userId,DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date,content FROM replys";
    const values = [];

    return sendQuery(sql,values);
}

export default {
    getPosts,
    getPost,
    updatePost,
    deletePost,
    deleteUserIdPost,
    createPost,
    createReply,
    deleteReply,
    updateReply,
    getReplys,
    deleteUserIdReplys,
}