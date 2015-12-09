/**
 * Created by guguyanhua on 12/9/15.
 */

import React, {
    View,
    StyleSheet,
} from 'react-native';

export default class Separator extends React.Component {
  render() {
    var myStyle = [styles.separator];
    if(this.props.backgroundColor){
      myStyle.push({backgroundColor:this.props.backgroundColor});
    }
    return (
        <View style={myStyle}/>
    )
  }
}

var styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
});
