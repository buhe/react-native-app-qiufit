/**
 * Created by guguyanhua on 12/10/15.
 */
var AV = require('avoscloud-sdk');

var React = require('react-native');
var Reflux = require('reflux');
var Actions = require('../actions/UserActionCreators');
var {
    AsyncStorage,
    } = React;


var UserStore = Reflux.createStore({
  listenables: Actions,
  _convertUser(user){
    var self = this;
    self.user = {};
    self.user.username = user.get('username');
    self.user.objectId = user.id;
    self.user.mobilePhoneNumber = user.get('mobilePhoneNumber');
  },
  _save(){
    var self = this;
    AsyncStorage.setItem('username', self.user.username, function (err, item) {
      console.log(err + item);
      AsyncStorage.getItem('username', function (err, item) {
        console.log(item);
      });
    });
    AsyncStorage.setItem('objectId', self.user.objectId, function (err, item) {
      console.log(err + item);
      AsyncStorage.getItem('objectId', function (err, item) {
        console.log(item);
      });
    });
    AsyncStorage.setItem('mobilePhoneNumber', self.user.mobilePhoneNumber, function (err, item) {
      console.log(err + item);
      AsyncStorage.getItem('mobilePhoneNumber', function (err, item) {
        console.log(item);
      });
    });
  },
  _saveVerify(){
    var self = this;
    AsyncStorage.setItem('verify', self.user.verify, function (err, item) {
      console.log(err + item);
      AsyncStorage.getItem('verify', function (err, item) {
        console.log(item);
      });
    });
  },
  async _get(attr){
    try {
      var value = await AsyncStorage.getItem(attr);
      if (value !== null) {
        this.user[attr] = value;
        this.trigger(this);
        return value;
      } else {
        console.log('get username null');
      }
    } catch (error) {
      console.log('get username error' + error);
      return null;
    }
  },
  registerUser: function (phone, success, fail) {
    var self = this;
    AV.User.logIn(phone, phone, {
      success: function (user) {
        //self._convertUser(user);
        //self._save();
        //if (success) {
        //  success();
        //}
        // 成功了，现在可以做其他事情了.
        //发送短信验证
        //!----------------------------
        //DEV 不发送了  prod的时候打开就好了
        AV.User.requestMobilePhoneVerify(phone).then(function () {
          console.log('send successful');
          self._convertUser(user);
          self._save();
          if(success){
            success();
          }
          //发送成功
        }, function (err) {
          console.log(err);
          if(fail){
            fail(err);
          }
          //发送失败
        });
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
            self._convertUser(self.user);
            self._save();
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
  requestMobilePhoneVerify: function (phone,success,fail) {
    AV.User.requestMobilePhoneVerify(phone).then(function () {
      console.log('send successful');
      if(success){
        success();
      }
      //发送成功
    }, function (err) {
      console.log(err);
      if(fail){
        fail(err);
      }
      //发送失败
    });
  },
  getInitialState: function () {
    if(!this.user){
      this.user = {};
      this.user.username = this.user.username || this._get('username').done();
      this.user.objectId = this.user.objectId || this._get('objectId').done();
      this.user.mobilePhoneNumber = this.user.mobilePhoneNumber || this._get('mobilePhoneNumber').done();
      this.user.verify = this.user.verify || this._get('verify').done();
    }
    return {
      user: this.user
    };
  },
  reset(){
    this.user = {};
  },
  verifyMobilePhone: function (code, success, fail) {
    var self = this;
    AV.User.verifyMobilePhone(code).then(function () {
      //验证成功
      self.user.verify = 'TRUE';  //不能是boolean ,只能是字符串
      self._saveVerify();
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
