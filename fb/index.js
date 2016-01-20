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

var FBLoginManager = NativeModules.FBLoginManager;
class FB {
  /**
   * Auth login
   */
  sendAuthReq(callback) {
    var permissions = ['email', 'public_profile'];
    FBLoginManager.loginWithPermissions(permissions, function (e, data) {
      var result = e || data;
      if (result.type === 'success' && result.profile) {
        try {
          result.profile = JSON.parse(result.profile)
          result.profile.token = result.token;
        } catch (err) {
          console.warn('Could not parse facebook profile: ', result.profile);
          alert(err);
        }
      }
      if (result.eventName === 'onLogin' || result.eventName === 'onLoginFound') {
        callback(result.profile);
      } else {

      }
    });
  }

  /**
   * 分享图片
   */
  shareImage() {

  }


}

module.exports = new FB();
