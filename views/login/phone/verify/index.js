/**
 * Created by guguyanhua on 12/10/15.
 */
import React, {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
var Reflux = require('reflux');
var deviceScreen = Dimensions.get('window');
var Router = require('../../../router');
import Nav from '../../../nav/CommonNav';
import CoolDown from 'react-native-countdown';
var I18n = require('react-native-i18n');
var  UserActionCreators  = require('../../../../actions/UserActionCreators');
var UserStore = require('../../../../stores/UserStore');
import Theme from '../../../theme';
var Login = React.createClass({

  mixins: [Reflux.connect(UserStore)],

  getInitialState(){
    return {
      text: ''
    }
  },

  sendAgain(){
    UserActionCreators.requestSmsCode(this.state.phone);
  },
  next() {
    var mobUser = {
      code: this.state.text,
      phone: this.state.phone,
      username: this.state.phone,
      type: 'mob'
    };
    UserActionCreators.registerUser(mobUser,
        function () {
          this.props.navigator.push(Router.getTypeList());
        }.bind(this), function (err) {
          console.log(err);
        })
  },
  changeText(text) {
    this.setState({text: text});
  },

  render() {
    return (
        <View>
          <Nav
              navText={I18n.t('input_v_code')}
              {... this.props}
              />
          <View style={styles.textLabel}>
            <Text style={[{color: '#8e8e8e',fontSize:16},Theme.subTitleFont]}>{I18n.t('send_verify')}</Text>
          </View>
          <View style={styles.textInputWrapper}>
            <Image source={require('../../../../images/signin_phone.png')}
                   style={{height:30,width:30,marginLeft:10,marginTop:15,marginBottom:15,marginRight:20}}/>
            <TextInput
                style={styles.textInput}
                placeholder={I18n.t('v_code')}
                underlineColorAndroid={'transparent'}
                onChangeText={this.changeText.bind(this)}
                onSubmitEditing={this.next.bind(this)}
                keyboardType={'numeric'}
                />
            <CoolDown
                onPress={this.sendAgain.bind(this)}
                text={I18n.t('send_again')}
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
            <Text style={[styles.actionText,Theme.subTitleFont]}>{I18n.t('finish')}</Text>
          </TouchableHighlight>
          <View style={{alignItems: 'center'}}>
            <Text style={[{fontSize:12,color:'#8c8c8c',marginTop:20},Theme.descFont]}>{I18n.t('you_phone')}
              +86 {this.state.phone}</Text>
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

module.exports = Login;
