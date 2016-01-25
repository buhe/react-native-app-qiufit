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
    Dimensions
} from 'react-native';
var deviceScreen = Dimensions.get('window');
import Theme from '../theme';
import I18nView from '../I18nView';
export default class CommonNav extends React.Component {

  render() {
    return (
        <View style={[styles.nav]}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Image source={require('../../images/navigation_back.png')} style={styles.closeImage}/>
          </TouchableOpacity>
          <Text style={[{
                    marginRight: (deviceScreen.width - 21 * this.props.navText.length  * I18nView.getI18nFontRadio() ) / 2,
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 21
                  },Theme.title]}>{this.props.navText}</Text>
        </View>
    )
  }
}

var styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeImage: {
    //position: 'absolute',
    //left: 8,
    //top: 8,
    marginLeft: 8,
    width: 32,
    height: 32,
  },
  rightButton: {
    fontSize: 18,
    marginRight: 8,
    //left: 120,
    flex: 1,
    color: 'white'
  }
});
