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
var deviceScreen = Dimensions.get('window');
var Router = require('../../router');
import Nav from '../../nav/CommonNav';
var UserActionCreators = require('../../../actions/UserActionCreators');
var UserStore = require('../../../stores/UserStore');
var I18n = require('react-native-i18n');

var Login = React.createClass({
  mixins: [require('../../../mixins/backandroid')()],

  getInitialState: function () {
    return {text: ''}
  },

  next() {
    UserActionCreators.requestSmsCode(this.state.text, function () {
      //发送成功
    }.bind(this), function (err) {
      //发送失败
    });
    this.props.navigator.push(Router.getVerify());
  },

  changeText(text) {
    this.setState({text: text});
  },

  render() {
    return (
        <View>
          <Nav
              navText={I18n.t('login')}
              {... this.props}
              />
          <View style={styles.textLabel}><Text style={{color: '#8e8e8e',fontSize:16}}>{I18n.t('please_input_phone_number')}</Text></View>
          <View style={styles.textInputWrapper}>
            <Image source={require('../../../images/signin_phone.png')}
                   style={{height:30,width:30,marginLeft:10,marginTop:15,marginBottom:15,marginRight:20}}/>
            <TextInput
                style={styles.textInput}
                placeholder={I18n.t('phone_number')}
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
            <Text style={styles.actionText}>{I18n.t('next')}</Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:12,color:'#8c8c8c',marginTop:20}}>{I18n.t('accept')}</Text>
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
