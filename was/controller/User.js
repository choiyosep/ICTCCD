const User = require('../service/User')
    , Response = require('../core/Response')


module.exports = {

    get: (Userid) => {
        return new Promise(async (resolve, reject) => {
            try {
                //받아온 ID로 getUserbyID 호출해서 User정보 가져오기
                const user = await User.getUserById(Userid);
                //id, nickname, level,push_con 가져오기 ->service에서 처리

                if (user) {//사용자가 존재하면

                    console.log(user[0].level)
                    // level이 1인경우 판매자로 반환하기
                    // level이 2인경우 구매자로 반환하기
                    if (user[0].level = 1) { user[0].level = '구매자' }
                    else if (user[0].level = 2) { user[0].level = '판매자' }
                    else { "사용자의 level이 존재 하지 않습니다." }
                    //push_con 정보 on/off로 반환
                    resolve(user[0]);
                } else {//등록된 상점이 없으면
                    //exception 발생시킴
                    throw Response.get(Response.type.USER_NOT_FOUND, {});
                }



            } catch (err) {
                console.log(err);
                reject(err);
            }


        });
    },


    updatePushCon: (buyerId, push_con) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(buyerId, push_con);
                const user = await User.getUserById(buyerId);
                if (user) {
                    const rs = await User.updatePushCon(buyerId, push_con);
                    resolve(rs);
                } else {
                    throw Response.get(Response.type.USER_NOT_FOUND, {});
                }
            } catch (err) {
                reject(err);
            }
        });
    },

    updateToken: (userId, token) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(userId, token);
                const user = await User.getUserById(userId);
                if (user) {
                    const rs = await User.updateToken(userId, token);
                    resolve(rs);
                } else {
                    throw Response.get(Response.type.USER_NOT_FOUND, {});
                }
            } catch (err) {
                reject(err);
            }
        });
    },
}
