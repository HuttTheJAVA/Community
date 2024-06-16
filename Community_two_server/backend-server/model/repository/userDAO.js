import {sendQuery} from "./dbConnect.js"

const getUserById = async (id) => {
    const sql = "SELECT id,email,nickname,profileImage FROM users WHERE id = ?";
    const values = [id];

    return sendQuery(sql,values);
}

const createUser = async (email,password,nickname,profileImage) => {
    const sql = "INSERT INTO users (email,password,nickname,profileImage) VALUES (?,?,?,?)";
    const values = [email,password,nickname,profileImage];

    return sendQuery(sql,values);
}

const updateNickname = async (user) => {
    const sql = "UPDATE users SET nickname = ? WHERE id = ?";
    const values = [user.nickname,user.id];

    return sendQuery(sql,values);
}

const updatePassword = async (userId,password) => {
    const sql = "UPDATE users SET password = ? WHERE id = ?";
    const values = [password,userId];

    return sendQuery(sql,values);
}

const deleteUser = async (id) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const values = [id];

    return sendQuery(sql,values);
}

const loginUser = async (email,password) => {
    const sql = "SELECT id FROM users WHERE email = ? AND password = ?";
    const values = [email,password];

    return sendQuery(sql,values);
}

const getUserByNickname = async (nickname) => {
    const sql = "SELECT id FROM users WHERE nickname = ?";
    const values = [nickname];

    return sendQuery(sql,values);
}

const getUserByEmail = async (email) => {
    const sql = "SELECT id FROM users WHERE email = ?";
    const values = [email];

    return sendQuery(sql,values);
}

const updateUser = async (userId,nickname,imgName) => {
    const sql = "UPDATE users SET nickname=?,profileImage=? WHERE id=?";
    const values = [nickname,imgName,userId];

    return sendQuery(sql,values);
}

export default {
    getUserById,
    createUser,
    updateNickname,
    updatePassword,
    deleteUser,
    loginUser,
    getUserByNickname,
    getUserByEmail,
    updateUser,
}