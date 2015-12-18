/**
 * Created by guguyanhua on 12/18/15.
 */

import React, {
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import Theme from '../theme';

export default class Button extends React.Component {
  render() {
    return (
        <TouchableHighlight
            onPress={this.props.press}
            style={[{
                        marginTop:40,
                        marginLeft:40,
                        marginRight:40,

                        height:60,
                        backgroundColor: 'black',},Theme.centerChild]}
            >
          <Text style={{
          fontSize: 20,
          color: 'white'
          }}>{this.props.text}</Text>
        </TouchableHighlight>
    );
  }
}
