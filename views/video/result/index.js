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

export default class Result extends React.Component {

  render() {
    return (
        <View>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Image source={{uri:IMG_PREFIX + 'btn_close.png'}} style={styles.closeImage}/>
          </TouchableOpacity>
          <Image source={{uri:IMG_PREFIX + '囚徒健身-切图-20.png'}} style={styles.mainLogo}/>
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
    position: 'absolute',
    left:50,
    top:40,
    width: 240,
    height: 120,
  }
});
