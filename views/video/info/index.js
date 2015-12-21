/**
 * es6
 * Created by guguyanhua on 12/9/15.
 */
import React, {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
var deviceScreen = require('Dimensions').get('window');
var VideoStore = require('../../../stores/VideoStore');
import Nav from '../../nav/CommonNav';
var Reflux = require('reflux');

var Info = React.createClass({
  mixins: [
    Reflux.connect(VideoStore)
  ],
  render() {
    return (
        <View>
          <Nav
              navText={this.state.ref.typeText}
              {...this.props}
              />
          <Image source={{uri:this.state.ref.infoImage}}
                 style={{
                    width:deviceScreen.width -20,
                    height:deviceScreen.height - 100,
                    margin:10
                 }}/>
        </View>
    );
  }

});

export default Info;
