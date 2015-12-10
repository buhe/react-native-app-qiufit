'use strict';

var Reflux = require('reflux');

var UserActionCreators = Reflux.createActions([
  'requestMobilePhoneVerify',
  'reset',//重置store,
  'verifyMobilePhone',
]);


module.exports = UserActionCreators;
