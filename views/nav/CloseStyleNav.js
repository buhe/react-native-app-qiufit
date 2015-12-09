/**
 * Created by guguyanhua on 12/9/15.
 */
import React, {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
export default class CloseStyleNav extends React.Component {
  render(){
    return (
        <View style={styles.nav}>
          <TouchableOpacity onPress={this.pop}>
            <Image source={{uri:IMG_PREFIX + 'btn_close.png'}} style={styles.closeImage}/>
          </TouchableOpacity>
          <Text style={styles.logoText}>{this.props.navText}</Text>
        </View>
    )
  }
}

var styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    height: 60,
  },
  logoText: {
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  closeImage: {
    left: 0,
    top: 0,
    width: 64,
    height: 64,
  }
});
