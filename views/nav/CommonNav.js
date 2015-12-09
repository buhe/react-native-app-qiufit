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
export default class CommonNav extends React.Component {
  render(){
    return (
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Image source={{uri:IMG_PREFIX + 'navigation_back.png'}} style={styles.closeImage}/>
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
    backgroundColor: 'black'
  },
  logoText: {
    marginTop: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  closeImage: {
    left: 8,
    top: 8,
    width: 32,
    height: 32,
  }
});
