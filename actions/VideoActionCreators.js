'use strict';

var Reflux = require('reflux');

var CommentActionCreators = Reflux.createActions([
  'fetchComments',//根据获取当前页面
  'reset',//重置store,
  'post',//发帖
  'finishTurning',
  'setRef',
]);


module.exports = CommentActionCreators;
