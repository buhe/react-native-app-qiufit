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
    Dimensions,
} from 'react-native';
var TimerMixin = require('react-timer-mixin');
var deviceScreen = Dimensions.get('window');
var Router = require('../../router');
import Nav from '../../nav/CommonNav';
var UserActionCreators = require('../../../actions/UserActionCreators');
var UserStore = require('../../../stores/UserStore');
var I18n = require('react-native-i18n');
import Spinner from 'react-native-loading-spinner-overlay';
var Animatable = require('react-native-animatable');
var Theme = require('../../theme');

var Login = React.createClass({
  mixins: [require('../../../mixins/backandroid')(), TimerMixin],

  getInitialState: function () {
    return {nickname: '', password: '', email: '', visible: false, alert: false, alertMsg: ''}
  },

  next() {
    this.setState({visible: true});
    var emailUser = {
      password: this.state.password,
      nickname: this.state.nickname ? this.state.nickname : this.state.email,
      username: this.state.email,
      email: this.state.email,
      type: 'email'
    };
    UserActionCreators.registerUser(emailUser,
        function () {
          this.setState({visible: false});
          this.props.navigator.push(Router.getTypeList());
        }.bind(this), function (err) {
          //FIXME alter
          console.log(err);
          this.setState({visible: false});
          if (err.code === 210) {
            //账户密码错误
            this.setState({alertMsg: I18n.t('passwordWrong'), alert: true});
          } else {
            this.setState({alertMsg: err.message ? err.message : I18n.t('registerFail'), alert: true});
          }
        }.bind(this))
  },

  nextField(){

  },

  changeUsername(text) {
    this.setState({email: text});
  },

  changePassword(text) {
    this.setState({password: text});
  },

  changeNickname(text) {
    this.setState({nickname: text});
  },

  hideAlert(){
    var self = this;
    this.setTimeout(function () {
      self.setState({alert: false});
    }, 2000);
  },

  render() {
    var alert = <View></View>;
    if (this.state.alert) {
      alert = <Animatable.View animation="fadeInDown" ref='alert'
                               style={[{position:'absolute',
                               left:0,top:0,height:60,width:deviceScreen.width,
                               backgroundColor:'red'
                               },Theme.centerChild]}
          //iterationCount={2} direction="alternate"
                               onAnimationEnd={this.hideAlert.bind(this)}
          >
        <Text
            style={{color:'white',fontWeight:'bold'}}
            >{this.state.alertMsg}</Text>
      </Animatable.View>
    }
    return (
        <View>
          <Nav
              navText={I18n.t('email_login')}
              {... this.props}
              />
          {alert}
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.visible}/>
          </View>
          <View style={styles.textLabel}><Text
              style={{color: '#8e8e8e',fontSize:16}}>{I18n.t('please_input_email')}</Text></View>
          <View style={styles.textInputWrapper}>
            <Image source={require('../../../images/signin_phone.png')}
                   style={{height:30,width:30,marginLeft:10,marginTop:15,marginBottom:15,marginRight:20}}/>
            <TextInput
                style={styles.textInput}
                placeholder={I18n.t('email')}
                underlineColorAndroid={'transparent'}
                onChangeText={this.changeUsername}
                onSubmitEditing={this.nextField}
                keyboardType={'email-address'}
                />
          </View>
          <View style={styles.textInputWrapper}>
            <Image source={require('../../../images/signin_phone.png')}
                   style={{height:30,width:30,marginLeft:10,marginTop:15,marginBottom:15,marginRight:20}}/>
            <TextInput
                style={styles.textInput}
                placeholder={I18n.t('password')}
                underlineColorAndroid={'transparent'}
                onChangeText={this.changePassword}
                onSubmitEditing={this.nextField}
                keyboardType={'default'}
                />
          </View>
          <View style={styles.textInputWrapper}>
            <Image source={require('../../../images/signin_phone.png')}
                   style={{height:30,width:30,marginLeft:10,marginTop:15,marginBottom:15,marginRight:20}}/>
            <TextInput
                style={styles.textInput}
                placeholder={I18n.t('nickname')}
                underlineColorAndroid={'transparent'}
                onChangeText={this.changeNickname}
                onSubmitEditing={this.next}
                keyboardType={'default'}
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
            <Text style={styles.actionText}>{I18n.t('email_login')}</Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:12,color:'#8c8c8c',marginTop:20}}>{I18n.t('accept_email')}</Text>
            <Text style={{fontSize:12,color:'#8c8c8c',marginTop:20}}>{I18n.t('license')}</Text>
          </View>
        </View>
    );
  }
});

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
    borderTopWidth: 1,
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

module.exports = Login;
