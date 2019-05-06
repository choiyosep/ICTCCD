const BaseModelForMysql = require('./BaseModelForMySql')
,Util =require('util');

function SmsModel(){
    BaseModelForMysql.call(this,'product');
    return this;
}
Util.inherits(SmsModel,BaseModelForMysql);

module.exports = new SmsModel();