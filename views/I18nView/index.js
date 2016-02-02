/**
 * Created by guguyanhua on 16/1/19.
 */
import React ,{

} from 'react-native';
var I18n = require('react-native-i18n');
class I18nView {
  //是不是大陆市场,这个影响国家服务,理论上是根据地理位置判断的,目前在打包的时候写死
  isZh(){
    //每次打包的时候改一下
    return true;
  }
  //是不是国语
  localeZh(){
    return I18n.locale.startsWith('zh');
  }

  getI18nFontRadio() {
    return I18n.locale.startsWith('zh') ? 1 : 0.5;
  }

  version(){
    return 'V 1.1';
  }
}

module.exports = new I18nView();