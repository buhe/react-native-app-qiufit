/**
 * Created by guguyanhua on 12/10/15.
 */
import React, {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    AlertIOS,
    Dimensions
} from 'react-native';
var deviceScreen = Dimensions.get('window');
var Router = require('../router');
var WeChat = require('../../wechat').default;
var SDK = require('../../wechat/SDK');
var I18n = require('react-native-i18n');
var FB = require('../../fb');
import UserActionCreators from '../../actions/UserActionCreators';
import UserStore from '../../stores/UserStore';
import Theme from '../theme';
var I18nView = require('../I18nView');
var ImageHolder;
if(I18nView.localeZh()){
  ImageHolder = require('../../images/zh');
}else{
  ImageHolder = require('../../images/en');
}
var Welcome = React.createClass({

  componentWillMount(){
    WeChat.registerApp(SDK.APPID, (res) => {
      //AlertIOS.alert(JSON.stringify(res)); // true or false
    });
  },

  skip(){
    UserActionCreators.skip();
    this.props.navigator.push(Router.getTypeList())
  },

  wechatLogin() {
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_test';
    WeChat.sendAuthReq(scope, state, (res) => {
      //AlertIOS.alert(JSON.stringify(res)); // true or false
      //AlertIOS.alert(res.code);

    });
  },

  fbLogin(){
    FB.sendAuthReq(function (profile) {
      var user = {
        username: profile.name,
        gender: profile.gender,
        avatarUrl: profile.picture.data.url,
        openId: profile.id,
        accessToken: profile.token,
        type: 'fb'
      };
      UserActionCreators.registerUser(user);
    })
  },

  render() {
    var leftButton;
    var loginButton;
    if (I18nView.isZh()) {
      leftButton = <TouchableOpacity onPress={() => this.props.navigator.push(Router.getLogin())}>
        <Text style={[styles.text,Theme.subTitleFont]}>{I18n.t('phone_login')}</Text>
      </TouchableOpacity>;
      loginButton = <TouchableOpacity
          //onPress={this.hideModal.bind(this)}
          onPress={this.wechatLogin}
          style={{
                                    height:70,
                                    alignItems:'center',  //水平居中
                                    justifyContent:'center', //垂直居中
                                    backgroundColor: 'black',
                                    marginRight:15,
                                    marginLeft:15,
                                    marginBottom: 50,  //三个组件分散开  这里可以指定下面的间距
                                    }}
          >
        <Text style={[styles.actionText,Theme.subTitleFont]}>{I18n.t('wechat_login')}</Text>
      </TouchableOpacity>
    } else {
      leftButton = <TouchableOpacity onPress={() => this.props.navigator.push(Router.getEmailLogin())}>
        <Text style={styles.text}>{I18n.t('email_login')}</Text>
      </TouchableOpacity>;
      loginButton = <TouchableOpacity
          //onPress={this.hideModal.bind(this)}
          onPress={this.fbLogin}
          style={{
                                    height:70,
                                    flexDirection:'row',
                                    alignItems:'center',  //水平居中
                                    justifyContent:'center', //垂直居中
                                    backgroundColor: 'black',
                                    marginRight:15,
                                    marginLeft:15,
                                    marginBottom: 50,  //三个组件分散开  这里可以指定下面的间距
                                    }}
          >
        <Image source={require('../../images/ico_facebook.png')} style={{width:20,height:20,marginRight:10}}/>
        <Text
          style={[styles.actionText,Theme.subTitleFont]}>{I18n.t('fb_login')}</Text>
      </TouchableOpacity>
    }
    return (
        <View style={{
        justifyContent: 'space-between',   //三个组件分散开
         flex:1
        }}>
          <View style={styles.topView}>
            {leftButton}
            <TouchableOpacity onPress={this.skip}>
              <Text style={styles.text}>{I18n.t('skip')}</Text>
            </TouchableOpacity>
          </View>
          <Image source={ImageHolder.signin_logo} style={{
            marginLeft: (deviceScreen.width - 150) / 2,
            height:150,
            width:150,
          }}/>
          {loginButton}
        </View>
    );
  }
});

var styles = StyleSheet.create({
  topView: {
    paddingTop: 20,
    paddingBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#1d1d1d',
    fontSize: 16
  },
  actionText: {
    fontSize: 18,
    color: 'white',
  },
});

module.exports = Welcome;
