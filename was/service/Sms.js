const Config = require('../config/Constant')
    , Sms = require('../model/Sms');

module.exports = {
    send: (phone, message) => {
        const message_obj = {
            TR_SENDDATE: new Date(),
            TR_SENDSTAT: '0',
            TR_MSGTYPE: '0',
            TR_PHONE: phone,
            TR_CALLBACK: Config.DATABASE.SMS_CALLBACK,
            TR_MSG: message
        };
        return Sms.create(message_obj);
    },

    get: (idx) => {
        return Sms.count('TR_NUM', idx);
    }
}
