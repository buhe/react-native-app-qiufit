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


var Welcome = React.createClass({

  getInitialState(){
    return {
      loginButton:null,
      leftButton:null,
    }
  },

  componentWillMount(){
    var self = this;
    WeChat.registerApp(SDK.APPID, (res) => {
      //AlertIOS.alert(JSON.stringify(res)); // true or false
    });
    this.setState({
      loginButton:<TouchableOpacity
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
    ,leftButton:<View />
    });

    WeChat.isInstall(function (installed) {
      if(installed){
        self.setState({
          loginButton:<TouchableOpacity
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
                        <Text style={styles.actionText}>微信登录</Text>
                      </TouchableOpacity>,
          leftButton:<TouchableOpacity onPress={() => self.props.navigator.push(Router.getLogin())}>
                        <Text style={styles.text}>手机登录</Text>
                      </TouchableOpacity>
        });
      }
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

    return (
        <View style={{
        justifyContent: 'space-between',   //三个组件分散开
         flex:1
        }}>
          <View style={styles.topView}>
            {this.state.leftButton}
            <TouchableOpacity onPress={() => this.props.navigator.push(Router.getTypeList())}>
              <Text style={styles.text}>随便看看</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../../images/signin_logo.png')} style={{
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
