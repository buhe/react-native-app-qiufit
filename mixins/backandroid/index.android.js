/**
 * Created by guguyanhua on 12/24/15.
 */
import {
    BackAndroid,
    ToastAndroid
    } from 'react-native';
module.exports = function(backFunction){
  return {
    backAndroidHandler:function(){
      if(backFunction){
        backFunction();
      }else{
        this.props.navigator.pop();
      }
      return true;
    },

    componentDidMount: function() {
      BackAndroid.addEventListener('hardwareBackPress', this.backAndroidHandler);
    }
  };
};
