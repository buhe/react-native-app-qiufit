/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var API = require('../../api');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    } = React;
import ExNavigator from '@exponent/react-native-navigator';
var Router = require('../router');
import UserStore from '../../stores/UserStore';

import Storage from 'react-native-storage';
import osUtils from '../../utils';
var I18n = require('react-native-i18n');

I18n.fallbacks = true;

I18n.translations = {
  'en': {
    login: 'Login',
    'please_input_phone_number':'Please input phone number',
    'pushUp':'Push Up',
    'deep':'Deep',
    'pullUp':'Pull Up',
    'leg':'Leg',
    'bridge':'Bridge',
    'handstand':'Handstand'
  },
  'zh': {
    login: '登录',
    'please_input_phone_number':'请输入手机号码',
    'pushUp':'俯卧撑',
    'deep':'深蹲',
    'pullUp':'引体向上',
    'leg':'举腿',
    'bridge':'桥',
    'handstand':'倒立撑'
  },
  'zh-TW': {
    login: '登錄',
    'please_input_phone_number':'請輸入手機號碼',
    'pushUp':'俯臥撐',
    'deep':'深蹲',
    'pullUp':'引體向上',
    'leg':'舉腿',
    'bridge':'橋',
    'handstand':'倒立撐'
  }
}

var storage = new Storage({
  //最大容量，默认值1000条数据循环存储
  size: 1000,

  //数据过期时间，默认一整天（1000 * 3600 * 24秒）
  defaultExpires: 1000 * 3600 * 24 * 365 * 10,

  //读写时在内存中缓存数据。默认启用。
  enableCache: true,

  //如果storage中没有相应数据，或数据已过期，
  //则会调用相应的sync同步方法，无缝返回最新数据。
  sync: {
    //同步方法的具体说明会在后文提到
  }
});
global.storage = storage;

var MainView = React.createClass({
  render: function () {
    return (<ExNavigator
        initialRoute={Router.getTypeList()}
        style={{ flex: 1 }}
        showNavigationBar={false}
        />);
  }
});

var WelcomeView = React.createClass({
  render: function () {
    return (<ExNavigator
        initialRoute={Router.getWelcome()}
        style={{ flex: 1 }}
        showNavigationBar={false}
        />);
  }
});

var PrisonerFitness = React.createClass({
  mixins: [Reflux.connect(UserStore)],
  render: function () {
    var view;
    if (this.state.user.username) {
      view = <MainView />;
    } else {
      view = <WelcomeView />;
    }
    return view;
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PrisonerFitness', () => PrisonerFitness);
