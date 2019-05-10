const BaseModelForMySql = require('./BaseModelForMySql')
    , Util = require('util');

function SmsModel() {
    //수정 테이블 명 지정해주는 역할뿐.
    BaseModelForMySql.call(this, 'sale');
    return this;
}

Util.inherits(SmsModel, BaseModelForMySql);

module.exports = new SmsModel();
