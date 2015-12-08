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
                <Image style={styles.playButton}
                       source={{uri: this.state.voice ? IMG_PREFIX + 'video_sound_open.png' : IMG_PREFIX + 'video_sound_close.png'}}/>
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
          <Text style={styles.title_text}>第一式: 墙壁俯卧撑</Text>
          <View style={styles.month}>
            <TouchableOpacity onPress={this.prev}>
              <Image source={{uri:IMG_PREFIX + 'btn_arrow_left01.png'}} style={styles.buttonIcon}/>
            </TouchableOpacity>
            <Text style={styles.month_text}>初级标准</Text>
            <TouchableOpacity onPress={this.next}>
              <Image source={{uri:IMG_PREFIX + 'btn_arrow_right01.png'}} style={styles.buttonIcon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.turningAnalytics}>
            <Image source={{uri:IMG_PREFIX + 'ico_x01.png'}} style={styles.x02}/>
            <Text style={styles.turningAnalyticsText}>1组, 10次</Text>
            <Image source={{uri:IMG_PREFIX + 'ico_x01.png'}} style={styles.x02}/>
          </View>
          <View style={styles.separator}/>
          <TouchableOpacity
              //onPress={this.hideModal.bind(this)}
              onPress={this.props.actionClick}
              style={{
                        margin:40,
                        paddingTop: 20,
                        paddingLeft:120,
                        paddingBottom:20,
                        backgroundColor: 'black',}}
              >
            <Text style={styles.actionText}>完成!</Text>
          </TouchableOpacity>
        </View>
    );

  }
});


var styles = StyleSheet.create({
  controlWrapper: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  playButton: {
    width: 50,
    height: 50,
  },
  infoWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 230,
    top: 10,
  },
  voiceWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 300,
    top: 10,
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
    marginLeft: 10,
    marginRight: 10,
    height: 1,
    backgroundColor: 'black',
  },
  title_text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 80,
  },
  month: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 40,
    marginTop: 40
  },
  month_text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    width: 32,
    height: 32,
  },
  turningAnalytics: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 120,
    paddingRight: 120,
  },
  x02: {
    height: 16,
    width: 16
  },
  turningAnalyticsText: {
    marginLeft: 20,
    marginRight: 20
  },
  actionText: {
    fontSize: 20,
    color: 'white'
  },
});

module.exports = ChartView;
