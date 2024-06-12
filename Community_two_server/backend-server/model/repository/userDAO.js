import {sendQuery} from "./dbConnect.js"

const getUserById = async (id) => {
    const sql = "SELECT id,nickname,profileImage FROM users WHERE id = ?";
    const values = [id];

    return sendQuery(sql,values);
}

const createUser = async (user) => {
    const sql = "INSERT INTO users (email,password,nickname,profileImage) VALUES (?,?,?,?)";
    const values = [user.email,user.password,user.nickname,user.profileImage];

    return sendQuery(sql,values);
}

const updateNickname = async (user) => {
    const sql = "UPDATE users SET nickname = ? WHERE id = ?";
    const values = [user.nickname,user.id];

    return sendQuery(sql,values);
}

const updatePassword = async (user) => {
    const sql = "UPDATE users SET password = ? WHERE id = ?";
    const values = [user.password,user.id];

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

export default {
    getUserById,
    createUser,
    updateNickname,
    updatePassword,
    deleteUser,
    loginUser
}