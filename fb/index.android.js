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

class FB {
  /**
   * Auth login
   */
  sendAuthReq(callback) {
    var permissions = ['email', 'public_profile'];
    FBLoginManager.loginWithPermissions(permissions, function (e, data) {
      var result = e || data;
      //iOS handler
      if (result.type === 'success' && result.profile) {
        try {
          result.profile = JSON.parse(result.profile)
          result.profile.token = result.token;
        } catch (err) {
          console.warn('Could not parse facebook profile: ', result.profile);
        }
        if (result.eventName === 'onLogin' || result.eventName === 'onLoginFound') {
          callback(result.profile);
        } else {

        }
      }

    });
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
