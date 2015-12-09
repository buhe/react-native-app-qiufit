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
class StepModal extends React.Component {
  render() {
    return (
        <View>
          <View style={{padding:30}}>
            <Image source={{uri:IMG_PREFIX + 'popover_bg.png'}} style={styles.bg}>
              <Text style={styles.nestedText}>第一式</Text>
            </Image>
            <Text style={styles.title}>墙壁俯卧撑</Text>
            <TouchableOpacity
                //onPress={this.hideModal.bind(this)}
                onPress={this.props.actionClick}
                style={{paddingTop: 20,
                        paddingLeft:100,
                        paddingBottom:20,
                        backgroundColor: 'black',}}
                >
              <Text style={styles.actionText}>开始</Text>
            </TouchableOpacity>
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
    marginLeft: 80,
    marginTop: 15,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 25
  },
  title: {
    margin: 40,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#141414'
  },
  actionText: {
    fontSize: 20,
    color: 'white'
  },
});

module.exports = StepModal;
