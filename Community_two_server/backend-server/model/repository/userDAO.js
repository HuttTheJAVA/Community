import {sendQuery} from "./dbConnect.js"

const getUserById = async (id) => {
    const sql = "SELECT id,email,password,nickname,profileImage FROM users WHERE id = ?";
    const args = [id];

    return sendQuery(sql,args);
}