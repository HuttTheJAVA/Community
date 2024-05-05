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

export default {
    validateUser,
}