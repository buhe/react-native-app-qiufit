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
var deviceScreen = require('Dimensions').get('window');
export default class CommonNav extends React.Component {

  render() {
    var rightButton = null;
    if (this.props.rightText && this.props.rightAction) {
      rightButton = (
          <TouchableOpacity onPress={() => this.props.rightAction()}>
            <Text style={styles.rightButton}>{this.props.rightText}</Text>
          </TouchableOpacity>
      );
    }
    return (
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Image source={{uri:IMG_PREFIX + 'navigation_back.png'}} style={styles.closeImage}/>
          </TouchableOpacity>
          <Text style={styles.logoText}>{this.props.navText}</Text>
          {rightButton}
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
    marginLeft:100,
    fontWeight: 'bold',
    color: 'white'
  },
  closeImage: {
    left: 8,
    top: 8,
    width: 32,
    height: 32,
  },
  rightButton: {
    marginTop: 20,
    marginLeft:120,
    flex: 1,
    color: 'white'
  }
});
