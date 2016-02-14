/**
 * Created by guguyanhua on 16/2/12.
 */
import JPush , {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush'
var Router = require('../views/router');
var React = require('react-native');
import StepActionCreators from '../actions/StepActionCreators';
var {
    ToastAndroid,
    } = React;
class Push {
  init(){
    JPush.requestPermissions();
    this.pushlisteners = [
      JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
      JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
    ]
  }

  setNav(nav){
    this.nav = nav;
  }

  destory(){
    this.pushlisteners.forEach(listener=> {
      JPush.removeEventListener(listener);
    });
  }
  onReceiveMessage(message) {
    //ToastAndroid.show("recv "+JSON.stringify(message), ToastAndroid.LONG);
  }
  onOpenMessage(message) {
    StepActionCreators.setTypeName('leg');
    this.nav && this.nav.push(Router.getStepList());
    //this.nav && this.nav.push(Router.getTypeList());
    //ToastAndroid.show(" open "+JSON.stringify(message), ToastAndroid.LONG);
    //console.log(JSON.stringify(message));
    //if(message && message.type){
    //    switch (message.type) {
    //      case '1' :
    //          //last tuning
    //
    //        break;
    //    }
    //
    //}
  }
}

module.exports = new Push();
