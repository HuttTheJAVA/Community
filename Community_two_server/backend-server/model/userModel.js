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
    userDAO.updateUser(userId,nickname,imgName);    
}

function deleteUser(userId){
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