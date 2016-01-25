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
import Nav from '../../nav/CommonNavRightButton';
var UserActionCreators = require('../../../actions/UserActionCreators');
var UserStore = require('../../../stores/UserStore');
var I18n = require('react-native-i18n');
import Spinner from 'react-native-loading-spinner-overlay';
var Animatable = require('react-native-animatable');
var Theme = require('../../theme');
var emailRegex = require('email-regex');

var Login = React.createClass({
  mixins: [require('../../../mixins/backandroid')(), TimerMixin],

  getInitialState: function () {
    return {nickname: '', password: '', email: '', visible: false, alert: false, alertMsg: '', errorStyle: {}}
  },

  next() {
    this.setState({visible: true});
    var emailUser = {
      password: this.state.password,
      username: this.state.email,
      email: this.state.email,
      type: 'email',
      action: 'login'
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
    if (emailRegex({exact: true}).test(text)) {
      this.setState({
        errorStyle: {}
      });
    } else {
      this.setState({
        errorStyle: {
          borderWidth: 1,
          borderColor: 'red',
        }
      });
    }
  },

  changePassword(text) {
    this.setState({password: text});
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
                               backgroundColor:'black'
                               },Theme.centerChild]}
          //iterationCount={2} direction="alternate"
                               onAnimationEnd={this.hideAlert.bind(this)}
          >
        <Text
            style={[{color:'white',fontWeight:'bold'},Theme.descFont]}
            >{this.state.alertMsg}</Text>
      </Animatable.View>
    }
    return (
        <View>
          <Nav
              navText={I18n.t('email_login')}
              {... this.props}
              rightText={I18n.t('email_register')}
              rightAction={()=> this.props.navigator.push(Router.getEmailRegister())}
              />
          {alert}
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.visible}/>
          </View>
          <View style={[styles.textInputWrapper,this.state.errorStyle]}>
            <Image source={require('../../../images/signin_phone.png')}
                   style={{height:30,width:30,marginLeft:10,marginTop:15,marginBottom:15,marginRight:20}}/>
            <TextInput
                style={styles.textInput}
                placeholder={I18n.t('email')}
                underlineColorAndroid={'transparent'}
                onChangeText={this.changeUsername}
                onSubmitEditing={this.nextField}
                keyboardType={'email-address'}
                autoFocus={true}
                autoCorrect={false}
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
                autoCorrect={false}
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
            <Text style={[styles.actionText,Theme.subTitleFont]}>{I18n.t('email_login')}</Text>
          </TouchableOpacity>
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
