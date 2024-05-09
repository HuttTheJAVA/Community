import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const usersJsonDir = '/model/repository/users.json';

function validateUser(email, password) {

    const usersJsonFile = fs.readFileSync(__dirname + usersJsonDir, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (const key in usersJsonData){
        let user = usersJsonData[key];
        if(user.email == email && user.password == password){
            return true;
        }
    }
    
    return false;
}

function getUserNickName(email) {
    const usersJsonFile = fs.readFileSync(__dirname + usersJsonDir, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (const key in usersJsonData){
        let user = usersJsonData[key];
        if(user.email == email){
            return user["nickname"];
        }
    }
}

function getUsers(){
    const usersJsonFile = fs.readFileSync(__dirname + usersJsonDir, 'utf8');
    return JSON.parse(usersJsonFile);
}

function joinUser(email,password,nickName,profileImage){
    const usersJsonFile = fs.readFileSync(__dirname + usersJsonDir, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);
    const newUser = {
        "email":email,
        "password":password,
        "nickname":nickName,
        "profileImage":profileImage,
    }
    usersJsonData[nickName] = newUser;
    const updateUsersJsonData = JSON.stringify(usersJsonData);
    fs.writeFileSync(path.join(__dirname,usersJsonDir),updateUsersJsonData);
}

function updateUser(originName,nickname,imgName){
    const usersJsonFile = fs.readFileSync(__dirname + usersJsonDir, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    if(originName in usersJsonData){
        const user = usersJsonData[originName];
        user.nickname = nickname;
        user.profileImage = imgName;
        delete usersJsonData[originName];
        usersJsonData[nickname] = user;

        fs.writeFileSync(__dirname + usersJsonDir,JSON.stringify(usersJsonData,null,2),'utf8');
    }else {
        console.log(`${originName}을(를) 찾을 수 없습니다.`);
    }
}

function deleteUser(nickname){
    const usersJsonFile = fs.readFileSync(__dirname + usersJsonDir, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    if(nickname in usersJsonData){
        delete usersJsonData[nickname];
        fs.writeFileSync(__dirname + usersJsonDir, JSON.stringify(usersJsonData, null, 2), 'utf8');
    }else {
        console.log(`${nickname}을(를) 찾을 수 없습니다.`);
    }
}

function updatePassword(nickName,password){
    const usersJsonFile = fs.readFileSync(__dirname + usersJsonDir, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    if(nickName in usersJsonData){
        usersJsonData[nickName]["password"] = password;
        fs.writeFileSync(__dirname + usersJsonDir,JSON.stringify(usersJsonData,null,2),'utf8');
    }else{
        console.log(`${nickName}을(를) 찾을 수 없습니다.`);
    }
}

export default {
    validateUser,
    getUserNickName,
    getUsers,
    joinUser,
    updateUser,
    updatePassword,
    deleteUser,
};