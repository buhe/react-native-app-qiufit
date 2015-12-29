/**
 * Created by guguyanhua on 12/9/15.
 * 健身结束分享页面
 */
import React, {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
var Reflux = require('reflux');
var ShareResultStore = require('../../../stores/ShareResultStore');

import Nav from '../../nav/CloseStyleNav';
var deviceScreen = require('Dimensions').get('window');
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
import Button from '../../button';
var ViewSnapshotter = require('../../../snapshot');
var WeChat = require('../../../wechat');
var osUtils = require('../../../utils');
import moment from 'moment';
import moment_cn from 'moment/locale/zh-cn';

var Result = React.createClass({
  mixins: [
    Reflux.connect(ShareResultStore)
  ],
  share() {
    var imagePath = osUtils.getCacheDir() + "/share.png";
    var ref = React.findNodeHandle(this.refs.shareView);
    ViewSnapshotter.saveSnapshotToPath(React.findNodeHandle(ref), imagePath, (error, successfulWrite) => {
      if (successfulWrite) {
        WeChat.shareImage({
          path: imagePath,
          tagName: '囚徒健身',
          title: '囚徒健身',
          desc: '囚徒健身',
          thumbPath: imagePath,
          scene: 1
        });
      } else {
        console.log(error)
      }
    });
  },

  render() {
    moment.locale('zh-cn');
    var m = moment();
    var month = moment.months(m.month());
    var day = m.day();
    return (
        <View>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Image source={{uri:IMG_PREFIX + 'btn_close.png'}} style={styles.closeImage}/>
          </TouchableOpacity>
          <View style={{alignItems:'center'}} ref='shareView'>
            <Image source={{uri:IMG_PREFIX + '囚徒健身-切图-20.png'}} style={styles.mainLogo}/>
            <View style={{borderWidth:5,marginTop:20,marginBottom:30,marginLeft:10,marginRight:10}}>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:60}}>新纪录!</Text>
                <View><Text style={{fontSize:18}}>{month}</Text><Text style={{fontSize:30}}>{day}</Text></View>
              </View>
              <Text style={{fontSize:30}}>{this.state.stepName}</Text>
              <View style={{flexDirection:'row'}}>
                <View><Text style={{fontSize:16}}>标准</Text><Text style={{fontSize:21}}>{this.state.subStepName}</Text></View>
                <View><Text style={{fontSize:16}}>动作</Text><Text style={{fontSize:21}}>{this.state.actionCount}</Text></View>
                <View><Text style={{fontSize:16}}>组</Text><Text style={{fontSize:21}}>{this.state.groupCount}</Text></View>
              </View>
            </View>
          </View>
          <Button
              text={'分享'}
              press={this.share.bind(this)}
              />
        </View>
    )
  }
});

var styles = StyleSheet.create({
  closeImage: {
    //position: 'absolute', //有的就可以,有的就显示不出来
    left: 0,
    top: 0,
    width: 64,
    height: 64,
  },
  mainLogo: {
    marginTop: 20,
    width: 240,
    height: 120,
  }
});

module.exports = Result;