const BaseModelForMySql = require('./BaseModelForMySql')
    , Util = require('util');

function SmsModel() {
    BaseModelForMySql.call(this, 'store_picture');
    return this;
}
//store_picture 이 이름은 여기서 지정?
//-> table 명


Util.inherits(SmsModel, BaseModelForMySql);

module.exports = new SmsModel();
