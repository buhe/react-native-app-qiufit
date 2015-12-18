'use strict';

var Reflux = require('reflux');

var StepActionCreators = Reflux.createActions([
    'setTypeName',
    'sync',
    'fetchByType',//根据获取当前页面
    'reset'//重置store
]);


module.exports = StepActionCreators;
