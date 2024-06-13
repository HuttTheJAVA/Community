import fs, { read } from 'fs';
import userDAO from './repository/userDAO.js';

async function validateUser(email, password) {
    const foundUser = await userDAO.loginUser(email,password);
    if(foundUser.length === 0){
        return -1;
    }
    return foundUser[0].id;
}

function getUserId(email) {
    const usersJsonData = readJson(usersJsonDir,'utf8');

    for (const key in usersJsonData){
        let user = usersJsonData[key];
        if(user.email == email){
            return user["userId"];  
        }
    }

    // 실제 DAO를 통해 DB의 것을 가져오는 코드 구현할 것.
}

function getUsers(){
    return readJson(usersJsonDir,'utf8');
}

async function getUser(userId){
    return await userDAO.getUserById(userId);
}

async function joinUser(email,password,nickName,profileImage){
    userDAO.createUser(email,password,nickName,profileImage);
}

function updateUser(originName,nickname,imgName){
    const usersJsonData = readJson(usersJsonDir,'utf8');

    let isFound = false;

    for(const Id in usersJsonData){
        if(usersJsonData[Id]["nickname"] === originName){
            usersJsonData[Id]["nickname"] = nickname;
            const user = usersJsonData[Id];
            user.nickname = nickname;
            user.profileImage = imgName;
            delete usersJsonData[Id];
            usersJsonData[Id] = user;
            isFound = true;

            writeJson(usersJsonDir,usersJsonData,'utf8');
            break;
        }
    }
    
    if(!isFound){
        console.log(`${originName}을(를) 찾을 수 없습니다.`);
    }
}

function deleteUser(userId){
    const usersJsonData = readJson(usersJsonDir,'utf8');
    const replysJsonData = readJson(replysJsonDir,'utf8');
    const postsJsonData = readJson(postsJsonDir,'utf8');

    if(userId in usersJsonData){
        delete usersJsonData[userId];
    }else {
        console.log(`${userId}을(를) 찾을 수 없습니다.`);
    }

    for(const postId in replysJsonData){
        const array = [];
        const replyArray = replysJsonData[postId];
        let isChanged = false;
        for(let idx = 0;idx<replyArray.length;idx++){
            const replyJson = replyArray[idx];
            if(parseInt(replyJson["userId"]) !== parseInt(userId)){
                array.push(replyJson);
            }else{
                isChanged = true;
            }
        }
        if(isChanged){
            delete replysJsonData[postId];
            replysJsonData[postId] = array;
        }
    }

    for(const postId in postsJsonData){
        const post = postsJsonData[postId];
        if(parseInt(post.userId) === parseInt(userId)){
            delete postsJsonData[postId];
        }
    }

    writeJson(usersJsonDir,usersJsonData,'utf8');
    writeJson(replysJsonDir,replysJsonData,'utf8');
    writeJson(postsJsonDir,postsJsonData,'utf8');
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
    getUserId,
    getUsers,
    joinUser,
    updateUser,
    updatePassword,
    deleteUser,
    getUser,
    getUserByNickname,
    getUserByEmail,
};