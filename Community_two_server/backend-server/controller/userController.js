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

export default {
    validateUser,
    getUsers,
    joinUser,
}