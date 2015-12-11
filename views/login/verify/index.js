/**
 * Created by guguyanhua on 12/10/15.
 */
import React, {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
} from 'react-native';
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var deviceScreen = require('Dimensions').get('window');
var Router = require('../../router');
import Nav from '../../nav/CommonNav';
import CoolDown from '../../cooldown';
import UserActionCreators from '../../../actions/UserActionCreators';
import UserStore from '../../../stores/UserStore';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }
  sendAgain(){
    UserActionCreators.requestMobilePhoneVerify(UserStore.user.mobilePhoneNumber);
  }
  next() {
    var self = this;
    UserActionCreators.verifyMobilePhone(this.state.text,
        function(){
          self.props.navigator.push(Router.getTypeList());
        },function(err){
          console.log(err);
        })
  }

  changeText(text) {
    this.setState({text: text});
  }

  render() {
    return (
        <View>
          <Nav
              navText='输入验证码'
              {... this.props}
              />
          <View style={styles.textLabel}>
            <Text style={{color: '#8e8e8e',fontSize:16}}>请稍后，你将会受到一条验证码短信</Text>
          </View>
          <View style={styles.textInputWrapper}>
            <Image source={{uri:IMG_PREFIX + 'signin_phone.png'}}
                   style={{height:30,width:30,marginLeft:10,marginTop:15,marginBottom:15,marginRight:20}}/>
            <TextInput
                style={styles.textInput}
                placeholder={'验证码'}
                underlineColorAndroid={'transparent'}
                onChangeText={this.changeText.bind(this)}
                onSubmitEditing={this.next.bind(this)}
                keyboardType={'numeric'}
                />
            <CoolDown
                onPress={this.sendAgain.bind(this)}
                />
          </View>
          <TouchableHighlight
              onPress={this.next.bind(this)}
              style={{
                        height:60,
                        alignItems:'center',  //水平居中
                        justifyContent:'center', //垂直居中
                        backgroundColor: 'black',
                        }}
              >
            <Text style={styles.actionText}>完成</Text>
          </TouchableHighlight>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:12,color:'#8c8c8c',marginTop:20}}>您的手机号码是 +86 {UserStore.user.mobilePhoneNumber}</Text>
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
