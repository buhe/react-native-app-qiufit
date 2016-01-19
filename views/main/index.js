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
    'please_input_phone_number': 'Please input phone number',
    'phone_number': 'Phone Number',
    'next': 'Next',
    'accept': 'Accept after click next button',
    'license': '《Qiu Fitness License》',
    'pushUp': 'Push Up',
    'deep': 'Deep',
    'pullUp': 'Pull Up',
    'leg': 'Leg',
    'bridge': 'Bridge',
    'handstand': 'Handstand',
    'primary': 'Primary',
    'intermediate': 'Intermediate',
    'advanced': 'Advanced',
    'ccpro': 'Convict Conditioning Pro',
    'analytics': 'Analytics',
    'record': 'Record',
    'finish_turning': ' peoples has completed',
    'comments': 'comments',
    'comment': 'comment',
    'complete': 'Completed!',
    'skip': 'Skip',
    'training': 'Training trends',
    'new_record': 'Record!',
    'level': 'Level',
    'action': 'Action',
    'group': 'Groups',
    'share': 'Share',
    'port': 'Post',
    'ban_msg': 'Unfriendly comments will be deleted , it shows the depth of discussion will be given priority .'
  },
  'zh': {
    login: '登录',
    'please_input_phone_number': '请输入手机号码',
    'phone_number': '手机号',
    'next': '下一步',
    'accept': '点击下一步按钮，即表示你同意',
    'license': '《囚徒健身软件许可及服务协议》',
    'pushUp': '俯卧撑',
    'deep': '深蹲',
    'pullUp': '引体向上',
    'leg': '举腿',
    'bridge': '桥',
    'handstand': '倒立撑',
    'primary': '初级标准',
    'intermediate': '中级标准',
    'advanced': '高级标准',
    'ccpro': '专业囚徒健身',
    'analytics': '训练分析',
    'record': '训练记录',
    'finish_turning': '个人完成该训练',
    'comments': ' 条评论',
    'comment': '写评论',
    'complete': '完成!',
    'skip': '随便看看',
    'training': '训练动态',
    'new_record': '新纪录!',
    'level': '标准',
    'action': '动作',
    'group': '组',
    'share': '分享',
    'port': '发布',
    'ban_msg': '不友善的言论会被删除，深度讨论会被优先展示。'
  },
  'zh-TW': {
    login: '登錄',
    'please_input_phone_number': '請輸入手機號碼',
    'phone_number': '手機號',
    'next': '下一步',
    'accept': '點擊下一步按鈕，即表示你同意',
    'license': '《囚徒健身軟件許可及服務協議》',
    'pushUp': '俯臥撐',
    'deep': '深蹲',
    'pullUp': '引體向上',
    'leg': '舉腿',
    'bridge': '橋',
    'handstand': '倒立撐',
    'primary': '初級標準',
    'intermediate': '中級標準',
    'advanced': '高級標準',
    'ccpro': '專業囚徒健身',
    'analytics': '訓練分析',
    'record': '訓練記錄',
    'finish_turning': '個人完成該訓練',
    'comments': ' 條評論',
    'comment': '寫評論',
    'complete': '完成!',
    'skip': '隨便看看',
    'training': '訓練動態',
    'new_record': '新動作!',
    'level': '標準',
    'action': '動作',
    'group': '組',
    'share': '分享',
    'port': '发布',
    'ban_msg': '不友善的言論會被刪除，深度討論會被優先展示。'
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
