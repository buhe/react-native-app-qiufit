/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var StepList = require('../steplist');
var Video = require('../../components/RNVideo');
var deviceScreen = require('Dimensions').get('window');
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
//var Reflux = require('reflux');
//var _ = require('lodash');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Navigator,
    TouchableOpacity,
    ScrollView,
    Image,
    } = React;

var ChartView = React.createClass({
  press(){
    console.log('press..');
  },
  render: function () {
    return (
        <View>
          <Video
              style={styles.listView}
              url={"http://7xkbzx.com1.z0.glb.clouddn.com/SampleVideo_1080x720_10mb.mp4"}
              //orientation={"EXPAND"}
              onTouchPlayer={this.press}
              />
          <View style={styles.playButtonWrapper}>
            <Image style={styles.playButton} source={{uri:IMG_PREFIX + 'video_btn_play.png'}}/>
          </View>
        </View>
    );

  }
});


var styles = StyleSheet.create({
  playButton:{
    width: 100,
    height: 100,
  },
  playButtonWrapper:{
    position: 'absolute',
    width: 100,
    height: 100,
    left: 20,
    top: 20,
  },
  listView: {
    width: deviceScreen.width,
    height: deviceScreen.height * 2 / 5,
  },
  nav: {
    flex: 1,
    height: 64,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  }
});

module.exports = ChartView;
