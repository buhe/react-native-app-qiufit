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
    Dimensions,
} from 'react-native';
var Reflux = require('reflux');
var ShareResultStore = require('../../../stores/ShareResultStore');

import Nav from '../../nav/CloseStyleNav';
var deviceScreen = Dimensions.get('window');
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
            <Image source={require('../../../images/btn_close.png')} style={styles.closeImage}/>
          </TouchableOpacity>
          <View style={{alignItems:'center'}} ref='shareView'>
            <Image source={require('../../../images/result.png')} style={styles.mainLogo}/>
            <View style={{borderWidth:5,marginTop:30,marginBottom:20}}>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:60,fontWeight:'bold',color:'#1d1d1d'}}>新纪录!</Text>
                <View
                    style={{backgroundColor:'black',alignItems:'center',justifyContent:'center',width:60,height:60,marginLeft:10}}>
                  <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>{month}</Text>
                  <Text style={{fontSize:28,color:'white',fontWeight:'bold'}}>{day}</Text>
                </View>
              </View>
              <View
                  style={{backgroundColor:'black',margin:0,paddingTop:10,paddingBottom:10,width:270,alignItems:'center'}}>
                <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>{this.state.stepName}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={styles.column}><Text style={styles.row}>标准</Text><Text
                    style={styles.cell}>{this.state.subStepName}</Text></View>
                <View style={styles.column}><Text style={styles.row}>动作</Text><Text
                    style={styles.cell}>{this.state.actionCount}</Text></View>
                <View style={styles.column}><Text style={styles.row}>组</Text><Text
                    style={styles.cell}>{this.state.groupCount}</Text></View>
              </View>
            </View>
          </View>
          <Button
              style={{
               marginLeft:40,
               marginRight:40
              }}
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
    width: 275,
    height: 150,
  },
  column: {
    width: 90, alignItems: 'center', justifyContent: 'center', padding: 2
  },
  row: {
    fontSize: 16,
    margin: 10,
    color:'#1d1d1d'
  },
  cell: {
    fontSize:21,
    color:'#1d1d1d'
  }
});

module.exports = Result;