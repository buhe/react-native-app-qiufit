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
                        height:60,
                        backgroundColor: 'black',},Theme.centerChild,this.props.style]}
            >
          <Text style={{
          fontSize: 20,
          color: 'white'
          }}>{this.props.text}</Text>
        </TouchableHighlight>
    );
  }
}
