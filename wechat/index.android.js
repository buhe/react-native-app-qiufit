/**
 * Created by guguyanhua on 12/22/15.
 * 桥接Android API
 */
var WeChat = require('react-native-wechat-android');

import {DeviceEventEmitter} from 'react-native';
var SDK = require('./SDK');
import UserActionCreators from '../actions/UserActionCreators';
import UserStore from '../stores/UserStore';

DeviceEventEmitter.addListener('finishedAuth', function (event) {
  var success = event.response.success;
  if (success) {
    SDK.getAccessToken(event.response.code, function (tokenRes) {
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
  } else {
    ToastAndroid.show('授权失败', ToastAndroid.SHORT);
  }
});
DeviceEventEmitter.addListener('finishedShare', function (event) {
  var success = event.response.success;
  if (success) {
    ToastAndroid.show('分享成功', ToastAndroid.SHORT);
  } else {
    ToastAndroid.show('分享失败', ToastAndroid.SHORT);
  }
});


export default {
  registerApp(appid, callback) {
    WeChat.registerApp(appid, callback);
  }
  ,
  sendAuthReq(scope, state, callback) {
    WeChat.sendAuthReq({scope: scope, state: state}, callback);
  }
  ,
  shareImage(options, callback){
    WeChat.sendImage(options, callback);
  }
}