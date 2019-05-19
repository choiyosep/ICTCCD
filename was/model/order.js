const BaseModelForMySql = require('./BaseModelForMySql')
    , Util = require('util');

function SmsModel() {
    BaseModelForMySql.call(this, 'soborrow.order');
    return this;
}

Util.inherits(SmsModel, BaseModelForMySql);

module.exports = new SmsModel();
