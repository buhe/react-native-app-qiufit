/**
 * Created by guguyanhua on 1/7/16.
 */

var React = require('react-native');


var {
    LinkingIOS
    } = React;

export default {
  openMarket(){
    //这个版本好像没有,需要升级
    LinkingIOS.openURL('https://itunes.apple.com/cn/app/jian-shen-fan/id1031156637?l=en&mt=8')
  }
  ,
  review(){
    //FIXME 这里换成我们自己的就好了
    LinkingIOS.openURL('itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1031156637')

  }
}