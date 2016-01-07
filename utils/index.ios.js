/**
 * Created by guguyanhua on 12/29/15.
 */
var RNFS = require("react-native-fs");
export default {
  getCacheDir(){
    return RNFS.CachesDirectoryPath;
  }
  ,
  getStatusHeight(){
    return 0;
  }
}
