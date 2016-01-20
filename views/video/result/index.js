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
var WeChat = require('../../../wechat').default;
var osUtils = require('../../../utils');
import moment from 'moment';
import moment_cn from 'moment/locale/zh-cn';
import moment_en from 'moment/locale/en-au';
var I18n = require('react-native-i18n');
var I18nView = require('../../I18nView');
var FB = require('../../../fb');

var Result = React.createClass({
  mixins: [
    Reflux.connect(ShareResultStore)
  ],
  share() {
    if (userId === 'unset') {
      return;
    }
    var imagePath = osUtils.getCacheDir() + "/share.png";
    var ref = React.findNodeHandle(this.refs.shareView);
    ViewSnapshotter.saveSnapshotToPath(React.findNodeHandle(ref), imagePath, (error, successfulWrite) => {
      if (successfulWrite) {
        if(I18nView.isZh()){
          WeChat.shareImage({
            path: imagePath,
            tagName: I18n.t('ccpro'),
            title: I18n.t('ccpro'),
            desc: I18n.t('ccpro'),
            thumbPath: imagePath,
            scene: 1
          });
        }else{
          FB.sendImage({
            path: imagePath,
            title: I18n.t('ccpro'),
            desc: I18n.t('ccpro'),
          },function(){})
        }

      } else {
        console.log(error)
      }
    });
  },

  render() {
    if(I18nView.isZh()){
      moment.locale('zh-cn');
    }else{
      moment.locale('en-au');
    }
    var m = moment();
    var month = moment.monthsShort(m.month());
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
                <Text style={{fontSize:60,fontWeight:'bold',color:'#1d1d1d'}}>{I18n.t('new_record')}</Text>
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
                <View style={styles.column}><Text style={styles.row}>{I18n.t('level')}</Text><Text
                    style={styles.cell}>{this.state.subStepName}</Text></View>
                <View style={styles.column}><Text style={styles.row}>{I18n.t('action')}</Text><Text
                    style={styles.cell}>{this.state.actionCount}</Text></View>
                <View style={styles.column}><Text style={styles.row}>{I18n.t('group')}</Text><Text
                    style={styles.cell}>{this.state.groupCount}</Text></View>
              </View>
            </View>
          </View>
          <Button
              style={{
               marginLeft:40,
               marginRight:40
              }}
              text={I18n.t('share')}
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