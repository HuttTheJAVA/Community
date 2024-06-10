import {connection,sendQuery} from "./dbConnect.js";

const getPosts = async () => {
    const sql = "SELECT * FROM posts";
    const values = [];

    return sendQuery(sql,values);
}

export default {
    getPosts
}