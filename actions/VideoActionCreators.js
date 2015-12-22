'use strict';

var Reflux = require('reflux');

var CommentActionCreators = Reflux.createActions([
  'refreshComments',
  'pullNextComment',//根据获取当前页面
  'reset',//重置store,
  'post',//发帖
  'finishTurning',
  'setRef',
  'getTrendCount',
  'pullNextTrends'
]);


module.exports = CommentActionCreators;
