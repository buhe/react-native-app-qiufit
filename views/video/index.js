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
  getInitialState: function () {
    return {
      showControl: false,
      paused: false,
      voice: true
    };
  },
  closeVoice(){
    this.setState({
      voice: !this.state.voice,
    });
  },
  press(){
    this.setState({
      showControl: !this.state.showControl,
      paused: !this.state.paused
    });
  },
  render: function () {
    var controlView = <View></View>;
    if (this.state.showControl) {
      controlView =
          <View style={styles.controlWrapper}>
            <View style={styles.playButtonWrapper}>
              <Image style={styles.playButton} source={{uri:IMG_PREFIX + 'video_btn_play.png'}}/>
            </View>
            <View style={styles.infoWrapper}>
              <Image style={styles.playButton} source={{uri:IMG_PREFIX + 'video_info.png'}}/>
            </View>
            <View style={styles.voiceWrapper}>
              <TouchableOpacity onPress={this.closeVoice}>
                <Image style={styles.playButton} source={{uri: this.state.voice ? IMG_PREFIX + 'video_sound_open.png' : IMG_PREFIX + 'video_sound_close.png'}} />
              </TouchableOpacity>
              </View>
          </View>
          ;
    }
    return (
        <View>
          <Video
              style={styles.listView}
              url={"http://7xkbzx.com1.z0.glb.clouddn.com/SampleVideo_1080x720_10mb.mp4"}
              paused={this.state.paused}
              onTouchPlayer={this.press}
              />
          {controlView}
        </View>
    );

  }
});


var styles = StyleSheet.create({
  controlWrapper:{
    position: 'absolute',
    left:0,
    top:0
  },
  playButton: {
    width: 50,
    height: 50,
  },
  infoWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 270,
    top: 20,
  },
  voiceWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 200,
    top: 20,
  },
  playButtonWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 150,
    top: 100,
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
