import fs, { read } from 'fs';
import path from 'path';

const __dirname = path.resolve();

const usersJsonDir = '/model/repository/users.json';

function readJson(sub_dir,encode){
    const usersJsonFile = fs.readFileSync(__dirname + sub_dir, encode);
    return JSON.parse(usersJsonFile);
}

function writeJson(sub_dir,usersJsonData,encode){
    fs.writeFileSync(__dirname + sub_dir,JSON.stringify(usersJsonData,null,2),encode);
}

function validateUser(email, password) {
    const usersJsonData = readJson(usersJsonDir,'utf8');

    for (const key in usersJsonData){
        let user = usersJsonData[key];
        if(user.email == email && user.password == password){
            return true;
        }
    }
    
    return false;
}

function getUserId(email) {
    const usersJsonData = readJson(usersJsonDir,'utf8');

    for (const key in usersJsonData){
        let user = usersJsonData[key];
        if(user.email == email){
            return user["userId"];
        }
    }
}

function getUsers(){
    return readJson(usersJsonDir,'utf8');
}

function getUser(userId){
    const usersJsonData = readJson(usersJsonDir,'utf8');
    return usersJsonData[userId];
}

function assignId(){
    const usersJsonData = JSON.parse(usersJsonDir,'utf8');
    let maxId = 0;
    for(key in usersJsonData){
        const intKey = parseInt(key);
        if(intKey > maxId){
            maxId = intKey;
        }
    }
    return maxId + 1;
}

async function joinUser(email,password,nickName,profileImage){
    const usersJsonData = readJson(usersJsonData,'utf8');

    const userId = await assignId();

    const newUser = {
        "userId":userId,
        "email":email,
        "password":password,
        "nickname":nickName,
        "profileImage":profileImage,
    }
    usersJsonData[userId] = newUser;
    writeJson(usersJsonDir,usersJsonData,'utf8');
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

    if(userId in usersJsonData){
        delete usersJsonData[userId];
        writeJson(usersJsonDir,usersJsonData,'utf8');
    }else {
        console.log(`${userId}을(를) 찾을 수 없습니다.`);
    }
}

function updatePassword(userId,password){
    const usersJsonData = readJson(usersJsonDir,'utf8');

    if(userId in usersJsonData){
        usersJsonData[userId]["password"] = password;
        writeJson(usersJsonDir,usersJsonData,'utf8');
    }else{
        console.log(`${userId}을(를) 찾을 수 없습니다.`);
    }
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
};