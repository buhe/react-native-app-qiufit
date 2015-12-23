'use strict';

var Reflux = require('reflux');

var UserActionCreators = Reflux.createActions([
  'registerUser',
  'reset',//重置store,
  'verifyMobilePhone',
]);


module.exports = UserActionCreators;
