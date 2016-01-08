/**
 * Created by guguyanhua on 10/30/15.
 */
import React, {
    StyleSheet,
    Dimensions
} from 'react-native';
var deviceScreen = Dimensions.get('window');

var styles = StyleSheet.create({
  centerChild: {
    alignItems: 'center',  //水平居中
    justifyContent: 'center', //垂直居中
  },
});

module.exports = styles;