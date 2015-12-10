/**
 * Created by guguyanhua on 12/10/15.
 */
var AV = require('avoscloud-sdk');
AV.initialize('{{OQYNgj8ffRah8qaSqaQjSgil-gzGzoHsz}}', '{{CH8e9IdQw3FjIqJ14p2kJee2}}');

var Reflux = require('reflux');
var Actions = require('../actions/UserActionCreators');


var UserStore = Reflux.createStore({
  listenables: Actions,
  requestMobilePhoneVerify: function () {
    AV.User.requestMobilePhoneVerify('13651940170').then(function(){
      console.log('send successful');
      //发送成功
    }, function(err){
      console.log(err);
      //发送失败
    });
  },
  getInitialState: function () {
    this.exam = this.exam || {};
    return {
      exam: this.exam
    };
  },
  reset(){
    this.exam = {};
  },
  verifyMobilePhone: function(code) {
    AV.User.verifyMobilePhone(code).then(function(){
      //验证成功
    }, function(err){
      //验证失败
    });
  }

});

module.exports = UserStore;