/**
 * Created by guguyanhua on 12/22/15.
 * 桥接iOS API
 */
import WeChat from 'react-native-wechat-ios';
var React = require('react-native');
var {
    NativeAppEventEmitter
    } = React;
var SDK = require('./SDK');
import UserActionCreators from '../actions/UserActionCreators';
import UserStore from '../stores/UserStore';
NativeAppEventEmitter.addListener(
    'didRecvAuthResponse',
    function (res) {
      //AlertIOS.alert(res.code);
      SDK.getAccessToken(res.code, function (tokenRes) {
        //AlertIOS.alert(JSON.stringify(tokenRes));
        SDK.getUserInfo(tokenRes.openid, tokenRes.access_token, function (userInfo) {
          //AlertIOS.alert(JSON.stringify(userInfo));
          var user = {
            username: userInfo.nickname,
            openId: userInfo.openid,
            gender: userInfo.sex === 1 ? 'male' : 'female',
            avatarUrl: userInfo.headimgurl,
            accessToken: tokenRes.access_token,
            type: 'wechat'
          };
          UserActionCreators.registerUser(user);
        }.bind(this), function () {
        })
      }.bind(this), function () {
      });
    }
);
export default {
  registerApp(appid, appdesc, callback) {
    WeChat.registerApp(appid, appdesc, callback);
  }
  ,
  sendAuthReq(scope, state, callback) {
    WeChat.sendAuthReq(scope, state, callback);
  }

  ,
  shareImage(options, callback){
    WeChat.sendImage(options, callback);
  }
  ,

  isInstall(callback){
    WeChat.isWXAppInstalled(callback);
  }
}
