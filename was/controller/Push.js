

const User = require('../service/user')
    , Firebase = require('../core/Firebase')
    , Response = require('../core/Response')


//route -> controller -> service -> model

//Controller 계층 : 가장 상위 레벨에서 핵심 비즈니스 로직을 수행한다.

module.exports = {
    send: () => {
        // return new Promise(async (resolve, reject) => {
        //     try {
        //         const users = await User.getUsers();
        //         if (users) {
        //             Firebase.sendPushMessage(users, Config.APP.NAME, '새로운 떨이상품입니다!!');
        //             resolve();
        //         } else {
        //             throw Response.get(Response.type.FAILED, {});
        //         }
        //     } catch (err) {
        //         console.log(err);
        //         reject(err);
        //     }
        // });
    }

}
