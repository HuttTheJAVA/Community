import fs, { read } from 'fs';
import userDAO from './repository/userDAO.js';
import postDAO from './repository/postDAO.js';

async function validateUser(email, password) {
    const foundUser = await userDAO.loginUser(email,password);
    if(foundUser.length === 0){
        return -1;
    }
    return foundUser[0].id;
}

async function getUser(userId){
    return await userDAO.getUserById(userId);
}

async function joinUser(email,password,nickName,profileImage){
    userDAO.createUser(email,password,nickName,profileImage);
}

function updateUser(userId,nickname,imgName){
    console.log(`userId:${userId},nickname:${nickname},imgName:${imgName}`);
    userDAO.updateUser(userId,nickname,imgName);    
}

function deleteUser(userId){
    // const usersJsonData = readJson(usersJsonDir,'utf8');
    // const replysJsonData = readJson(replysJsonDir,'utf8');
    // const postsJsonData = readJson(postsJsonDir,'utf8');

    // if(userId in usersJsonData){
    //     delete usersJsonData[userId];
    // }else {
    //     console.log(`${userId}을(를) 찾을 수 없습니다.`);
    // }

    // for(const postId in replysJsonData){
    //     const array = [];
    //     const replyArray = replysJsonData[postId];
    //     let isChanged = false;
    //     for(let idx = 0;idx<replyArray.length;idx++){
    //         const replyJson = replyArray[idx];
    //         if(parseInt(replyJson["userId"]) !== parseInt(userId)){
    //             array.push(replyJson);
    //         }else{
    //             isChanged = true;
    //         }
    //     }
    //     if(isChanged){
    //         delete replysJsonData[postId];
    //         replysJsonData[postId] = array;
    //     }
    // }

    // for(const postId in postsJsonData){
    //     const post = postsJsonData[postId];
    //     if(parseInt(post.userId) === parseInt(userId)){
    //         delete postsJsonData[postId];
    //     }
    // }

    // writeJson(usersJsonDir,usersJsonData,'utf8');
    // writeJson(replysJsonDir,replysJsonData,'utf8');
    // writeJson(postsJsonDir,postsJsonData,'utf8');

    userDAO.deleteUser(userId);
    postDAO.deleteUserIdPost(userId);
    postDAO.deleteUserIdReplys(userId);
}

function updatePassword(userId,password){
    userDAO.updatePassword(userId,password);
}

async function getUserByNickname(nickname){
    return await userDAO.getUserByNickname(nickname);
}

async function getUserByEmail(email){
    return await userDAO.getUserByEmail(email);
}

export default {
    validateUser,
    joinUser,
    updateUser,
    updatePassword,
    deleteUser,
    getUser,
    getUserByNickname,
    getUserByEmail,
};