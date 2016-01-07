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
        try{
          this.props.navigator.pop();
        }catch(e){
          //ToastAndroid.show(e.message, ToastAndroid.LONG);
        }
      }
      return true;
    },

    componentDidMount: function() {
      BackAndroid.addEventListener('hardwareBackPress', this.backAndroidHandler);
    }
  };
};
