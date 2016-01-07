/**
 * Created by guguyanhua on 12/29/15.
 */
import RNFS from 'react-native-fs';
RNFS.mkdir('/sdcard/prisonerfitness');
export default {
  getCacheDir(){
    return '/sdcard/prisonerfitness';
  }
  ,
  getStatusHeight(){
   return 20;
  }
}