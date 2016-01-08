/**
 * Created by guguyanhua on 12/29/15.
 */
var RNFS = require("react-native-fs");
class OS {
  getCacheDir() {
    return RNFS.CachesDirectoryPath;
  }

  getStatusHeight() {
    return 0;
  }
}

module.exports = new OS();
