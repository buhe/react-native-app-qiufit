/**
 * Created by guguyanhua on 12/9/15.
 */

var Reflux = require('reflux');
var Actions = require('../actions/TrendActionCreators');
//var _ = require('lodash');

let mock = [
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
  {
    nickname : '车老师棒棒的',
    time : Date.now(),
  },
];


var TrendStore = Reflux.createStore({
  listenables: Actions,
  fetchAll: function () {
  },
  getInitialState: function () {
    this.trends = this.trends || mock;
    return {
      trends: this.trends
    };
  },
  reset(){
    this.trends = [];
  }

});

module.exports = TrendStore;
