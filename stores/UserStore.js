/**
 * Created by guguyanhua on 12/10/15.
 */
var AV = require('avoscloud-sdk');
AV.initialize('OQYNgj8ffRah8qaSqaQjSgil-gzGzoHsz', 'CH8e9IdQw3FjIqJ14p2kJee2');
AV.Promise.setPromisesAPlusCompliant(true);

var Reflux = require('reflux');
var Actions = require('../actions/UserActionCreators');


function saveUser(user) {

}

var UserStore = Reflux.createStore({
  listenables: Actions,
  registerUser: function (phone, success, fail) {
    var self = this;
    AV.User.logIn(phone, phone, {
      success: function (user) {
        if (success) {
          self.user = user;
          saveUser(self.user);
          success();
        }
        // 成功了，现在可以做其他事情了.
        //发送短信验证
        //!----------------------------
        //DEV 不发送了  prod的时候打开就好了
        //AV.User.requestMobilePhoneVerify(phone).then(function () {
        //  console.log('send successful');
        //  self.user = user;
        //  saveUser(self.user);
        //  if(success){
        //    success();
        //  }
        //  //发送成功
        //}, function (err) {
        //  console.log(err);
        //  if(fail){
        //    fail(err);
        //  }
        //  //发送失败
        //});
        //!--------------------------
      },
      error: function (user, error) {
        var user = new AV.User();
        user.set("username", phone);
        user.set("password", phone);
        user.setMobilePhoneNumber(phone);

        user.signUp(null, {
          success: function (userServer) {
            // 注册成功，可以使用了.
            self.user = userServer;
            saveUser(self.user);
            if (success) {
              success();
            }
          },
          error: function (user, err) {
            if (fail) {
              fail(err);
            }
          }
        });

      }
    });

  },
  requestMobilePhoneVerify: function (phone) {
    AV.User.requestMobilePhoneVerify(phone).then(function () {
      console.log('send successful');
      //发送成功
    }, function (err) {
      console.log(err);
      //发送失败
    });
  },
  getInitialState: function () {
    this.user = this.user || {};
    return {
      user: this.user
    };
  },
  reset(){
    this.user = {};
  },
  verifyMobilePhone: function (code, success, fail) {
    AV.User.verifyMobilePhone(code).then(function () {
      //验证成功
      if (success) {
        success();
      }
    }, function (err) {
      //验证失败
      if (fail) {
        fail(err);
      }
    });
  }

});

module.exports = UserStore;