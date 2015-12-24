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
} from 'react-native';
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var deviceScreen = require('Dimensions').get('window');
var Router = require('../router');
var WeChat = require('../../wechat');


var Welcome = React.createClass({

  mixins: [require('../../mixins/backandroid')()],

  componentWillMount(){
    WeChat.registerApp('wxb401408ecbea2897', (res) => {
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
    return (
        <View style={{
        justifyContent: 'space-between',   //三个组件分散开
         flex:1
        }}>
          <View style={styles.topView}>
            <TouchableOpacity onPress={() => this.props.navigator.push(Router.getLogin())}>
              <Text style={styles.text}>手机登录</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigator.push(Router.getTypeList())}>
              <Text style={styles.text}>随便看看</Text>
            </TouchableOpacity>
          </View>
          <Image source={{uri:IMG_PREFIX + 'signin_logo.png'}} style={{
            marginLeft: (deviceScreen.width - 150) / 2,
            height:150,
            width:150,
          }}/>
          <TouchableOpacity
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

export default Welcome;
