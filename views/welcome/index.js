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
import Push from '../../jpush';
var ImageHolder;
if (I18nView.localeZh()) {
  ImageHolder = require('../../images/zh');
} else {
  ImageHolder = require('../../images/en');
}
var Welcome = React.createClass({

  getInitialState(){
    return {
      loginButton: null,
      leftButton: null,
    }
  },
  componentWillUnmount() {
    Push.destory();
  },
  componentWillMount(){
    Push.setNav(this.props.navigator);
    Push.init();
    var self = this;
    this.setState({
      loginButton: <TouchableOpacity
          onPress={() => this.props.navigator.push(Router.getLogin())}
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
        <Text style={styles.actionText}>手机登录</Text>
      </TouchableOpacity>
      , leftButton: <View />
    });

    if (I18nView.isZh()) {
      WeChat.registerApp(SDK.APPID, (res) => {
        //AlertIOS.alert(JSON.stringify(res)); // true or false
      });
      WeChat.isInstall(function (installed) {
        global.installWechat = installed;
        if (installed) {
          self.setState({
            loginButton: <TouchableOpacity
                //onPress={this.hideModal.bind(this)}
                onPress={self.wechatLogin}
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
              <Text style={styles.actionText}>{I18n.t('wechat_login')}</Text>
            </TouchableOpacity>,
            leftButton: <TouchableOpacity onPress={() => self.props.navigator.push(Router.getLogin())}>
              <Text style={styles.text}>{I18n.t('phone_login')}</Text>
            </TouchableOpacity>
          });
        }
      });
    } else {
      global.installWechat = true;//TODO 这里名字要改一下
      this.setState({
        leftButton: <TouchableOpacity onPress={() => self.props.navigator.push(Router.getEmailLogin())}>
          <Text style={styles.text}>{I18n.t('email_login')}</Text>
        </TouchableOpacity>,
        loginButton: <TouchableOpacity
            //onPress={this.hideModal.bind(this)}
            onPress={self.fbLogin}
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
      });
    }

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
    return (
        <View style={{
        justifyContent: 'space-between',   //三个组件分散开
         flex:1
        }}>
          <View style={styles.topView}>
            {this.state.leftButton}
            <TouchableOpacity onPress={this.skip}>
              <Text style={styles.text}>{I18n.t('skip')}</Text>
            </TouchableOpacity>
          </View>
          <Image source={ImageHolder.signin_logo} style={{
            marginLeft: (deviceScreen.width - 150) / 2,
            height:150,
            width:150,
          }}/>
          {this.state.loginButton}
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
