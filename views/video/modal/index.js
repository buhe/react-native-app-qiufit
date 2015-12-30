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
class VideoModal extends React.Component {
  render() {
    return (
        <View>
          <View style={{padding:30}}>
            <View style={[Theme.centerChild]}>
              <Image source={{uri:IMG_PREFIX + 'popover_'+this.props.typeName+'.png'}} style={styles.bg} />
            </View>
            <View style={[Theme.centerChild,{marginTop: 40,marginBottom:40}]}>
              <Text style={styles.nestedText}>{this.props.stepName}</Text>
              <Text style={[styles.title]}>{this.props.subStep}</Text>
            </View>
            <Button
                press={this.props.actionClick}
                text={'确定'}
                >
            </Button>
          </View>
        </View>
    )
  }
}

var styles = StyleSheet.create({
  bg: {
    width: 90,
    height: 90
  },
  nestedText: {
    top:-10,
    fontWeight: 'bold',
    fontSize: 24
  },
  title: {
    fontSize: 18,
    color: '#1d1d1d'
  },
});

module.exports = VideoModal;
