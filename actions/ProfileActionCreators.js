'use strict';

var Reflux = require('reflux');

var TypeActionCreators = Reflux.createActions([
    'pullTurningDate',//根据获取当前页面
    'reset'//重置store
]);


module.exports = TypeActionCreators;
