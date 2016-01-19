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
import I18nView from '../I18nView';
var I18n = require('react-native-i18n');

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

var Welcome = React.createClass({

  componentWillMount(){
    WeChat.registerApp(SDK.APPID, (res) => {
      //AlertIOS.alert(JSON.stringify(res)); // true or false
    });
  },

  wechatLogin() {
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_test';
    WeChat.sendAuthReq(scope, state, (res) => {
      //AlertIOS.alert(JSON.stringify(res)); // true or false
      //AlertIOS.alert(res.code);

    });
  },

  render() {
    var leftButton = <View></View>;
    var loginButton;
    if(I18nView.isZh()){
      leftButton = <TouchableOpacity onPress={() => this.props.navigator.push(Router.getLogin())}>
                    <Text style={styles.text}>手机登录</Text>
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
                    <Text style={styles.actionText}>微信登录</Text>
                  </TouchableOpacity>
    }else{
      loginButton = <FBLogin style={{ marginBottom: 10, }}
                             permissions={["email","user_friends"]}
                             onLogin={function(data){
            console.log("Logged in!");
            console.log(data);
            //_this.setState({ user : data.credentials });
          }}
                             onLogout={function(){
            console.log("Logged out.");
            //_this.setState({ user : null });
          }}
                             onLoginFound={function(data){
            console.log("Existing login found.");
            console.log(data);
            //_this.setState({ user : data.credentials });
          }}
                             onLoginNotFound={function(){
            console.log("No user logged in.");
            //_this.setState({ user : null });
          }}
                             onError={function(data){
            console.log("ERROR");
            console.log(data);
          }}
                             onCancel={function(){
            console.log("User cancelled.");
          }}
                             onPermissionsMissing={function(data){
            console.log("Check permissions!");
            console.log(data);
          }}
          />
    }
    return (
        <View style={{
        justifyContent: 'space-between',   //三个组件分散开
         flex:1
        }}>
          <View style={styles.topView}>
            {leftButton}
            <TouchableOpacity onPress={() => this.props.navigator.push(Router.getTypeList())}>
              <Text style={styles.text}>{I18n.t('skip')}</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../../images/signin_logo.png')} style={{
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
