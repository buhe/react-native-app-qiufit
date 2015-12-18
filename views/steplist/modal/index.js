/**
 * Created by guguyanhua on 12/2/15.
 */

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    PixelRatio
    } = React;
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
import Button from '../../button';
import Theme from '../../theme';
class StepModal extends React.Component {
  render() {
    return (
        <View>
          <View style={{padding:30}}>
            <Image source={{uri:IMG_PREFIX + 'popover_bg.png'}} style={[styles.bg,Theme.centerChild]}>
              <Text style={styles.nestedText}>{this.props.step}</Text>
            </Image>
            <View style={[Theme.centerChild,{marginTop: 40}]}>
              <Text style={[styles.title]}>{this.props.name}</Text>
            </View>
            <Button
                press={this.props.actionClick}
                text={'开始'}
                >
            </Button>
          </View>
        </View>
    )
  }
}

var styles = StyleSheet.create({
  bg: {
    width: 255,
    height: 90
  },
  nestedText: {
    top:-10,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 24
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1d1d1d'
  },
  actionText: {
    fontSize: 20,
    color: 'white'
  },
});

module.exports = StepModal;
