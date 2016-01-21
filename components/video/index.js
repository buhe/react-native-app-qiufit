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
    Alert,
    Dimensions
    } = React;
var Router = require('../../views/router');
var RNVideo = require('react-native-video');
var deviceScreen = Dimensions.get('window');
let videoHeight = deviceScreen.width / 1.73;
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
      showInfo: true,
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
      paused: !this.state.paused,
      showInfo: false,
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
        if(RNFS.stat(localUrl),function(stat){
              if(!stat.isFile()){
                //被清除了,重新下载
                RNFS.downloadFile(self.props.url, localUrl, function () {
                  //begin
                }, function (process) {
                  var progress = process.bytesWritten / process.contentLength;
                  if (progress > 0.1) {
                    if (progress - self.state.progress > 0.1) {
                      self.setState({progress: progress});
                    }
                  }

                }).then(function(){
                  self.setState({localUrl: localUrl,progress: 1,showInfo:false});
                  AsyncStorage.setItem(self.props.url, localUrl);
                }).catch(function(err){
                  //下载出问题了?
                });
              }
            });
        self.setState({localUrl: localUrl,showInfo:false});
      } else {
        var localVideoUrl = osUtils.getDocmentDir() + "/" + fileName;
        RNFS.downloadFile(self.props.url, localVideoUrl, function () {
          //begin
        }, function (process) {
          var progress = process.bytesWritten / process.contentLength;
          if (progress > 0.1) {
            if (progress - self.state.progress > 0.1) {
              self.setState({progress: progress});
            }
          }

        }).then(function(){
          self.setState({localUrl: localVideoUrl,progress: 1,showInfo:false});
          AsyncStorage.setItem(self.props.url, localVideoUrl);
        }).catch(function(err){
          //下载出问题了?
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
                <Image style={styles.playButton} source={require('../../images/video_btn_play.png')}/>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.infoWrapper}>
              <TouchableWithoutFeedback onPress={this.info}>
                <Image style={styles.infoButton} source={require('../../images/video_info.png')}/>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.voiceWrapper}>
              <TouchableWithoutFeedback onPress={this.closeVoice}>
                <Image style={styles.voiceButton}
                       source={this.state.muted ? require('../../images/video_sound_close.png') : require('../../images/video_sound_open.png')}/>
              </TouchableWithoutFeedback>
            </View>
          </View>
      ;
    }else if(this.state.showInfo){//视频没有播放
      controlView =
          <View style={styles.controlWrapper}>
            <View style={[styles.infoWrapper,{left: deviceScreen.width - 70}]}>
              <TouchableWithoutFeedback onPress={this.info}>
                <Image style={styles.infoButton} source={require('../../images/video_info.png')}/>
              </TouchableWithoutFeedback>
            </View>
          </View>
    }

    var videoView =
        <View>
          <Image
              source={require('../../images/video_bg_default.jpg')}
              style={[styles.video,Theme.centerChild]}
              >
              <Image
                  source={require('../../images/video_loading.png')}
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
                paused={this.props.paused || this.state.paused}               // Pauses playback entirely.
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
                source={require('../../images/video_bg_default.jpg')}
                style={[styles.video,Theme.centerChild]}
                >
                <Image
                    source={require('../../images/video_alarm.png')}
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