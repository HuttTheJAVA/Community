import { getUser } from './getUser.js';
import {getUserIdFromSession} from './session.js';

// 세션 확인 미들웨어
async function checkSession(){
    var userSessionId = ''

    const result = {
        userId:''
    }

    await getUserIdFromSession(result);
    userSessionId = result.userId;

    getUser(userSessionId);
};

// 페이지 로드 시 세션 확인
window.onload = function() {
    checkSession();
};