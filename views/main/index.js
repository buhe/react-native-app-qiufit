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
    Navigator,
    } = React;
import ExNavigator from '@exponent/react-native-navigator';
var Router = require('../router');
import UserStore from '../../stores/UserStore';

import Storage from 'react-native-storage';
import osUtils from '../../utils';

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
