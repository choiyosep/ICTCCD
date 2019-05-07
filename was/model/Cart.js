const BaseModelForMySql = require('./BaseModelForMySql')
    , Util = require('util');

function SmsModel() {
    BaseModelForMySql.call(this, 'cart');
    return this;
}

Util.inherits(SmsModel, BaseModelForMySql);

module.exports = new SmsModel();
