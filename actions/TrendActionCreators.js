/**
 * Created by guguyanhua on 12/9/15.
 */

var Reflux = require('reflux');

var TrendActionCreators = Reflux.createActions([
  'fetchAll',//根据获取当前页面
  'reset'//重置store
]);


module.exports = TrendActionCreators;
