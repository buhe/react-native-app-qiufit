/**
 * Created by guguyanhua on 12/30/15.
 * auto cache video
 * placeholder image
 */
var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    AsyncStorage,
    } = React;
var Router = require('../../views/router');
var RNVideo = require('react-native-video');
var deviceScreen = require('Dimensions').get('window');
let videoHeight = deviceScreen.width / 1.73;
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var RNFS = require('react-native-fs');
var osUtils = require('../../utils');
var ProgressBar = require('react-native-progress-bar');
var Theme = require('../../views/theme');

var Video = React.createClass({
  getInitialState: function () {
    return {
      showControl: false,
      paused: false,
      muted: false,
      localUrl: '',
      progress: 0.0,
    };
  },
  closeVoice(){
    this.setState({
      muted: !this.state.muted,
    });
  },
  press(){
    this.setState({
      showControl: !this.state.showControl,
      paused: !this.state.paused
    });
  },
  info(){
    this.props.navigator.push(Router.getInfo());
  },

  componentWillMount(){
    var self = this;
    if (!self.props.url) {
      return;
    }
    var paths = self.props.url.split('/');
    var fileName = paths[paths.length - 1];
    AsyncStorage.getItem(this.props.url, function (err, localUrl) {
      if (localUrl) {
        self.setState({localUrl: localUrl});
      } else {
        var localVideoUrl = osUtils.getCacheDir() + "/" + fileName;
        RNFS.downloadFile(self.props.url, localVideoUrl, function () {

        }, function (process) {
          var progress = process.bytesWritten / process.contentLength;
          if (progress > 0.1) {
            if (progress - self.state.progress > 0.1) {
              self.setState({progress: progress});
            }
          }
          if (process.bytesWritten === process.contentLength) {
            self.setState({localUrl: localVideoUrl});
            AsyncStorage.setItem(self.props.url, localVideoUrl);
          }
        });
      }
    });
  },

  render: function () {
    var controlView = <View></View>;
    if (this.state.showControl) {
      controlView =
          <View style={styles.controlWrapper}>
            <View style={styles.playButtonWrapper}>
              <TouchableWithoutFeedback onPress={this.press}>
                <Image style={styles.playButton} source={{uri:IMG_PREFIX + 'video_btn_play.png'}}/>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.infoWrapper}>
              <TouchableWithoutFeedback onPress={this.info}>
                <Image style={styles.infoButton} source={{uri:IMG_PREFIX + 'video_info.png'}}/>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.voiceWrapper}>
              <TouchableWithoutFeedback onPress={this.closeVoice}>
                <Image style={styles.voiceButton}
                       source={{uri: this.state.muted ? IMG_PREFIX + 'video_sound_open.png' : IMG_PREFIX + 'video_sound_close.png'}}/>
              </TouchableWithoutFeedback>
            </View>
          </View>
      ;
    }

    var videoView =
        <View>
          <Image
              source={{uri:IMG_PREFIX + 'video_bg_default.jpg'}}
              style={[styles.video,Theme.centerChild]}
              >
              <Image
                  source={{uri:IMG_PREFIX + 'video_loading.png'}}
                  style={{width: 120,height: 40,backgroundColor:'transparent'}}
                  />
              <ProgressBar
                  //fillStyle={}
                  backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
                  style={{marginTop: 10, width: 120}}
                  progress={this.state.progress}
                  />

          </Image>
        </View>;
    //storage
    if (this.state.localUrl) {
      videoView = (
          <TouchableWithoutFeedback onPress={this.press} style={styles.listView}>
            <RNVideo
                source={{uri: this.state.localUrl,isNetwork:false}} // Can be a URL or a local file.
                rate={1.0}                   // 0 is paused, 1 is normal.
                volume={1.0}                 // 0 is muted, 1 is normal.
                muted={this.state.muted}                // Mutes the audio entirely.
                paused={this.state.paused}               // Pauses playback entirely.
                repeat={true}// Repeat forever.
                style={styles.video}
                resizeMode="cover"
                />
          </TouchableWithoutFeedback>
      );
    } else if (!this.props.url) { //没有视频播放链接
      videoView =
          <View>
            <Image
                source={{uri:IMG_PREFIX + 'video_bg_default.jpg'}}
                style={[styles.video,Theme.centerChild]}
                >
                <Image
                    source={{uri:IMG_PREFIX + 'video_alarm.png'}}
                    style={{width: 180,height: 40,backgroundColor:'transparent'}}
                    />
            </Image>
          </View>;
    }

    return (
        <View>
          {videoView}
          {controlView}
        </View>
    )
  }
});

var styles = StyleSheet.create({
  controlWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  playButton: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  infoButton: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  voiceButton: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  infoWrapper: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: deviceScreen.width - 140,
    top: 10,
    backgroundColor: 'transparent',
  },
  voiceWrapper: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: deviceScreen.width - 70,
    top: 10,
    backgroundColor: 'transparent',
  },
  playButtonWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: (deviceScreen.width - 50) / 2,
    top: (videoHeight - 50) / 2,
    backgroundColor: 'transparent',
  },
  video: {
    width: deviceScreen.width,
    height: videoHeight,
  },
});

module.exports = Video;