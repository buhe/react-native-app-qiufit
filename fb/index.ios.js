/**
 * Created by guguyanhua on 16/1/20.
 * facebook sdk
 */
var React = require('react-native');
var {
    NativeModules,
    StyleSheet,
    View,
    TouchableHighlight,
    Text
    } = React;
import UserActionCreators from '../actions/UserActionCreators';
var FBLoginManager = NativeModules.FBLoginManager;
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

function _getInfo(user, callback) {
  var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email,gender&access_token=${user.token}`;

  fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        callback(responseData);
      })
      .done();
}

function _registerUser(profile) {
  var user = {
    username: profile.name,
    gender: profile.gender,
    //avatarUrl: profile.headimgurl,
    openId: profile.id,
    accessToken: profile.token,
    type: 'fb'
  };
  UserActionCreators.registerUser(user);
}

function _login(data) {
  _getInfo(data.credentials, function (profile) {
    profile.token = data.credentials.token;
    _registerUser(profile);
  });
}

RCTDeviceEventEmitter.addListener(
    FBLoginManager.Events["Login"],
    _login
);
RCTDeviceEventEmitter.addListener(
    FBLoginManager.Events["LoginFound"],
    _login
);
//iOS handler

class FB {
  /**
   * Auth login
   */
  sendAuthReq() {
    var permissions = ['email', 'public_profile'];
    FBLoginManager.loginWithPermissions(permissions,function(){});
  }

  /**
   * 分享图片
   */
  sendImage(options, callback) {
    FBLoginManager.sendImage(
        options.path,
        options.title,
        options.desc,
        callback
    );
  }


}

module.exports = new FB();
