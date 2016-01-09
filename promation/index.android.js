/**
 * Created by guguyanhua on 1/7/16.
 */

var React = require('react-native');


var {
    IntentAndroid
    } = React;

export default {
  openMarket(packageId){
    //这个版本好像没有,需要升级
    IntentAndroid.openURL('market://details?id=com.bodyfun.mobile');
  }
}