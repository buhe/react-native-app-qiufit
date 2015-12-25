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

import Nav from '../../nav/CloseStyleNav';
var deviceScreen = require('Dimensions').get('window');
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
import Button from '../../button';
var ViewSnapshotter = require('react-native-view-snapshot');
var RNFS = require("react-native-fs");
var WeChat = require('../../../wechat');

export default class Result extends React.Component {

  share(){
    var imagePath = RNFS.CachesDirectoryPath+"/share.png";
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
  }

  render() {
    return (
        <View ref='shareView'>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Image source={{uri:IMG_PREFIX + 'btn_close.png'}} style={styles.closeImage}/>
          </TouchableOpacity>
          <View style={{alignItems:'center'}}>
            <Image source={{uri:IMG_PREFIX + '囚徒健身-切图-20.png'}} style={styles.mainLogo}/>
            <View style={{borderWidth:5,marginTop:20,marginBottom:30,marginLeft:10,marginRight:10}}>
              <View  style={{flexDirection:'row'}}>
                <Text style={{fontSize:60}}>新纪录!</Text>
                <View><Text style={{fontSize:18}}>六月</Text><Text style={{fontSize:30}}>24</Text></View>
              </View>
              <Text style={{fontSize:30}}>第一式: 墙壁俯卧撑</Text>
              <View style={{flexDirection:'row'}}>
                <View><Text style={{fontSize:16}}>标准</Text><Text style={{fontSize:21}}>初级标准</Text></View>
                <View><Text style={{fontSize:16}}>动作</Text><Text style={{fontSize:21}}>10 个</Text></View>
                <View><Text style={{fontSize:16}}>组</Text><Text style={{fontSize:21}}>1 组</Text></View>
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
}

var styles = StyleSheet.create({
  closeImage: {
    //position: 'absolute', //有的就可以,有的就显示不出来
    left: 0,
    top: 0,
    width: 64,
    height: 64,
  },
  mainLogo: {
    marginTop: -30,
    width: 240,
    height: 120,
  }
});
