/**
 * Created by guguyanhua on 12/10/15.
 */
import React, {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var deviceScreen = require('Dimensions').get('window');
var Router = require('../router');
import Nav from '../nav/CommonNav';
var UserActionCreators = require('../../actions/UserActionCreators');
var UserStore = require('../../stores/UserStore');

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }

  next() {
    UserActionCreators.requestSmsCode(this.state.text, function () {
      //发送成功
    }.bind(this), function (err) {
      //发送失败
    });
    this.props.navigator.push(Router.getVerify());
  }

  changeText(text) {
    this.setState({text: text});
  }

  render() {
    return (
        <View>
          <Nav
              navText='登录'
              {... this.props}
              />
          <View style={styles.textLabel}><Text style={{color: '#8e8e8e',fontSize:16}}>请输入手机号</Text></View>
          <View style={styles.textInputWrapper}>
            <Image source={{uri:IMG_PREFIX + 'signin_phone.png'}}
                   style={{height:30,width:30,marginLeft:10,marginTop:15,marginBottom:15,marginRight:20}}/>
            <TextInput
                style={styles.textInput}
                placeholder={'手机号'}
                underlineColorAndroid={'transparent'}
                onChangeText={this.changeText.bind(this)}
                onSubmitEditing={this.next.bind(this)}
                keyboardType={'numeric'}
                />
          </View>
          <TouchableOpacity
              onPress={this.next.bind(this)}
              style={{
                        height:60,
                        alignItems:'center',  //水平居中
                        justifyContent:'center', //垂直居中
                        backgroundColor: 'black',
                        }}
              >
            <Text style={styles.actionText}>下一步</Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:12,color:'#8c8c8c',marginTop:20}}>点击下一步按钮，即表示你同意</Text>
            <Text style={{fontSize:12,color:'#8c8c8c',marginTop:20}}>《囚徒健身软件许可及服务协议》</Text>
          </View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  textLabel: {
    height: 60,
    alignItems: 'center',  //水平居中
    justifyContent: 'center', //垂直居中
  },
  textInputWrapper: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
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

export default Login;
