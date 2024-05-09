import model from '../model/userModel.js';

function validateUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const isValid = model.validateUser(email, password)
    const resultJson = {
        result : `${isValid}`
    }
    
    if (resultJson.result) {
        req.session.user = {
            nickname: `${model.getUserNickName(email)}`,
            authorized: true,
        }
        console.log("세션 생성!");
        console.log(req.session.user);
 
    }

    res.status(200).json(resultJson);
}

function getUsers(req,res){
    res.json(model.getUsers());
}

function joinUser(req,res){
    const Body = req.body;

    const email = Body.email;
    const password = Body.password;
    const nickName = Body.nickName;
    const profileImage = Body.profileImage;
    
    model.joinUser(email,password,nickName,profileImage);
    res.status(204).send("join_success");
}

function updateUser(req,res){
    const originNickName = req.body.originNickName;
    const nickname = req.body.nickname;
    const imgName = req.body.imgName;

    model.updateUser(originNickName,nickname,imgName);
    res.status(204).send("update_success");
}

function updatePassword(req,res){
    const nickName = req.body.nickname;
    const password = req.body.password;

    model.updatePassword(nickName,password);
    res.status(204).send("update_success");
}

function deleteUser(req,res){
    const nickname = req.body.nickname;
    model.deleteUser(nickname);
    res.status(204).send("delete_success");
}

export default {
    validateUser,
    getUsers,
    joinUser,
    updateUser,
    updatePassword,
    deleteUser,
}