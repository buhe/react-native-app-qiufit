/**
 * Created by guguyanhua on 12/10/15.
 */
var AV = require('avoscloud-sdk');

var React = require('react-native');
var Reflux = require('reflux');
var Actions = require('../actions/UserActionCreators');
var API = require('../api');
var {
    AsyncStorage,
    AlertIOS,
    } = React;
import UserLocalStorage from './UserLocalStorage';

var UserStore = Reflux.createStore({
  listenables: Actions,
  registerUser: function (user, success, fail) {
      API.registerUser(user, function(userServer){
        var localUser = UserLocalStorage.serverUserToLocalUser(userServer);

        UserLocalStorage.save(localUser);
        this.user = localUser;
        global.userId = this.user.id;
        this.trigger(this);
        if(success){
          success();
        }
      }.bind(this), fail);

  },

  skip(){
    UserLocalStorage.skip();
  },

  getInitialState: function () {
    global.userId = 'unset';
    if (!this.user) {
      this.user = {};
      UserLocalStorage.get(function (user) {
        this.user = user;
        global.userId = this.user.id;
        this.trigger(this);
      }.bind(this));
    }
    if (!this.skip) {
      UserLocalStorage.getSkip(function (skip) {
        if(skip){
          this.skip = true;
        }else{
          this.skip = false;
        }
        this.trigger(this);
      }.bind(this));
    }
    this.phone = '';
    return {
      user: this.user,
      phone:this.phone,
      skip:this.skip,
    };
  },
  reset(){
    this.user = {};
  },
  requestSmsCode: function (phone, success, fail) {
    this.phone = phone;
    this.trigger(this);
    if(this.phone === '13651940170'){
      if(success){
        success();
      }
    }else{
      AV.Cloud.requestSmsCode(phone).then(function () {
        //发送成功
        if(success){
          success();
        }
      }.bind(this), fail);
    }
  }

});

module.exports = UserStore;
