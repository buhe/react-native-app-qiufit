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

const Hans = {
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
  'ban_msg': '不友善的言論會被刪除，深度討論會被優先展示。',
  'mon': '一',
  'tue': '二',
  'wed': '三',
  'thu': '四',
  'fri': '五',
  'sat': '六',
  'sun': '日',
  'year': '年',
  'month': '月',
  'start': '開始！'
};

I18n.translations = {
  'en': {
    login: 'Login',
    'please_input_phone_number': 'Please input phone number',
    'phone_number': 'Phone Number',
    'next': 'Next',
    'accept': 'Accept after click next button',
    'license': '《Qiu Fitness License》',
    'pushUp': 'Push Up',
    'deep': 'Squat',
    'pullUp': 'Pull Up',
    'leg': 'Leg Raise',
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
    'ban_msg': 'Unfriendly comments will be deleted , it shows the depth of discussion will be given priority .',
    'mon': 'Mon',
    'tue': 'Tue',
    'wed': 'Wed',
    'thu': 'Thu',
    'fri': 'Fri',
    'sat': 'Sat',
    'sun': 'Sun',
    'year': ' . ',
    'month': '',
    'start': 'Start!',
    'next_step': 'Then next step!',
    'goal':'The goal is ',
    '_1s10':'1 set 5',
    '_1_1': '1 Wall Pushups',
    '_1_2': '2 Incline Pushups',
    '_1_3': '3 Kneeling Pushups',
    '_1_4': '4 Half Pushups',
    '_1_5': '5 Full Pushups',
    '_1_6': '6 Close Pushups',
    '_1_7': '7 Uneven Pushups',
    '_1_8': '8 Half One-Arm Pushups',
    '_1_9': '9 Lever Pushups',
    '_1_10': '10 One-Arm Pushups',
    '_2_1': '1 Shoulderstand Squats',
    '_2_2': '2 Jackknife Squats',
    '_2_3': '3 Supported Squats',
    '_2_4': '4 Half Squats',
    '_2_5': '5 Full Squats',
    '_2_6': '6 Close Squats',
    '_2_7': '7 Uneven Squats',
    '_2_8': '8 Half One-Leg Squats',
    '_2_9': '9 Assisted One-Leg Squats',
    '_2_10': '10 One-Leg Squats',

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
    'ban_msg': '不友善的言论会被删除，深度讨论会被优先展示。',
    'mon': '一',
    'tue': '二',
    'wed': '三',
    'thu': '四',
    'fri': '五',
    'sat': '六',
    'sun': '日',
    'year': '年',
    'month': '月',
    'start': '开始！',
    'next_step': '然后开始下一式',
    'goal':'逐步做到 ',
    'side':'(每侧)',
    '_1s10':'1组, 10次',
    '_1s1':'1组, 1次',
    '_1s2':'1组, 2次',
    '_1s3':'1组, 3次',
    '_1s4':'1组, 4次',
    '_1s5':'1组, 5次',
    '_1s6':'1组, 6次',
    '_1s8':'1组, 8次',
    '_1s100':'1组, 100次',
    '_2s2':'2组, 2次',
    '_2s3':'2组, 3次',
    '_2s5':'2组, 5次',
    '_2s4':'2组, 4次',
    '_2s6':'2组, 6次',
    '_2s7':'2组, 7次',
    '_2s8':'2组, 8次',
    '_2s9':'2组, 9次',
    '_2s10':'2组, 10次',
    '_2s12':'2组, 12次',
    '_2s15':'2组, 15次',
    '_2s20':'2组, 20次',
    '_2s25':'2组, 25次',
    '_2s30':'2组, 30次',
    '_2s35':'2组, 35次',
    '_2s50':'2组, 50次',
    '_3s10':'3组, 10次',
    '_3s20':'3组, 20次',
    '_3s25':'3组, 25次',
    '_3s30':'3组, 30次',
    '_3s35':'3组, 35次',
    '_3s40':'3组, 40次',
    '_3s50':'3组, 50次',
    '_4s40':'4组, 40次',
    '_10s':'10秒',
    '_30s':'30秒',
    '_1m':'1分钟',
    '_2m':'2分钟',
    '_1_1': "第一式 墙壁俯卧撑",
    '_1_2': "第二式 上斜俯卧撑",
    '_1_3': "第三式 膝盖俯卧撑",
    '_1_4': "第四式 半俯卧撑",
    '_1_5': "第五式 标准俯卧撑",
    '_1_6': "第六式 窄距俯卧撑",
    '_1_7': "第七式 偏重俯卧撑",
    '_1_8': "第八式 单臂半俯卧撑",
    '_1_9': "第九式 杠杆俯卧撑",
    '_1_10': "最终式 单臂俯卧撑",
    '_2_1': "第一式 肩倒立深蹲",
    '_2_2': "第二式 折刀深蹲",
    '_2_3': "第三式 支撑深蹲",
    '_2_4': "第四式 半深蹲",
    '_2_5': "第五式 标准深蹲",
    '_2_6': "第六式 窄距深蹲",
    '_2_7': "第七式 偏重深蹲",
    '_2_8': "第八式 单腿半深蹲",
    '_2_9': "第九式 单腿辅助深蹲",
    '_2_10': "最终式 单腿深蹲",
  },
  'zh-Hant-CN': Hans,
  'zh-TW': Hans,
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
