const BaseModelForMysql = require('./BaseModelForMySql')
,Util =require('util');

function SmsModel(){
    BaseModelForMysql.call(this,'product_picture');
    return this;
}
Util.inherits(SmsModel,BaseModelForMysql);

module.exports = new SmsModel();