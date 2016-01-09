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
import Button from '../../button';
import Theme from '../../theme';
class VideoModal extends React.Component {

  render() {
    var icon;
    if(this.props.typeName === 'pushUp'){
      icon = <Image source={require('../../../images/popover_a.png')} style={styles.bg}/>
    }else if(this.props.typeName === 'deep'){
      icon = <Image source={require('../../../images/popover_b.png')} style={styles.bg}/>
    }else if(this.props.typeName === 'pullUp'){
      icon = <Image source={require('../../../images/popover_c.png')} style={styles.bg}/>
    }else if(this.props.typeName === 'leg'){
      icon = <Image source={require('../../../images/popover_d.png')} style={styles.bg}/>
    }else if(this.props.typeName === 'bridge'){
      icon = <Image source={require('../../../images/popover_e.png')} style={styles.bg}/>
    }else if(this.props.typeName === 'handstand'){
      icon = <Image source={require('../../../images/popover_f.png')} style={styles.bg}/>
    }
    return (
        <View>
          <View style={{padding:30}}>
            <View style={[Theme.centerChild]}>
              {icon}
            </View>
            <View style={[Theme.centerChild,{marginTop: 40,marginBottom:40}]}>
              <Text style={styles.nestedText}>{this.props.stepName}</Text>
              <Text style={[styles.title]}>{this.props.subStep}</Text>
            </View>
            <Button
                style={{
                   marginLeft:20,
                   marginRight:20
                      }}
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
    top: -10,
    fontWeight: 'bold',
    fontSize: 24
  },
  title: {
    fontSize: 18,
    color: '#1d1d1d'
  },
});

module.exports = VideoModal;
