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
var I18n = require('react-native-i18n');
var I18nVIew = require('../../I18nView');
class StepModal extends React.Component {
  render() {
    var stepName = this.props.step;
    return (
        <View>
          <View style={{padding:30}}>
            <Image source={require('../../../images/popover_bg.png')} style={[styles.bg,Theme.centerChild]}>
              <Text style={[styles.nestedText,Theme.subTitleFont]}>{stepName}</Text>
            </Image>
            <View style={[Theme.centerChild,{marginTop: 40,marginBottom:40}]}>
              <Text style={[styles.title,Theme.titleFont]}>{this.props.name}</Text>
            </View>
            <Button
                style={{
                     marginLeft:20,
                     marginRight:20
                  }}
                press={this.props.actionClick}
                text={I18n.t('start')}
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
    top: -10,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 24,
    textAlign:'center'
  },
  title: {
    fontSize: 30,
    //fontWeight: 'bold',
    color: '#1d1d1d',
    textAlign:'center'
  },
  actionText: {
    fontSize: 20,
    color: 'white'
  },
});

module.exports = StepModal;
