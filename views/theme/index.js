/**
 * Created by guguyanhua on 10/30/15.
 */
import React, {
    StyleSheet,
    Dimensions
} from 'react-native';
var deviceScreen = Dimensions.get('window');
var I18nView = require('../I18nView');
var titleFont = {fontWeight:'bold'};
var subTitleFont = {};
var descFont = {};
if (!I18nView.localeZh()) {
  titleFont = {
    fontFamily: 'RobotoCondensed-Bold'
  };
  subTitleFont = {
    fontFamily: 'RobotoCondensed-Regular'
  };
  descFont = {
    fontFamily: 'Roboto-Light'
  }
}
var styles = StyleSheet.create({
  centerChild: {
    alignItems: 'center',  //水平居中
    justifyContent: 'center', //垂直居中
  },
  titleFont: titleFont,
  subTitleFont: subTitleFont,
  descFont: descFont
});

module.exports = styles;