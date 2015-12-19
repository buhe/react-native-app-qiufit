/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');

var VideoStore = require('../../stores/VideoStore');
var StepList = require('../steplist');
var Video = require('react-native-video');
var deviceScreen = require('Dimensions').get('window');
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var Reflux = require('reflux');
var Router = require('../router');
import VideoActionCreators from '../../actions/VideoActionCreators';
let videoHeight = deviceScreen.height * 2 / 5;
import Theme from '../theme';

//var _ = require('lodash');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Navigator,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    } = React;

class CommentItem extends React.Component {
  render() {
    return (
        <View>
          <View style={styles.commentTitle}>
            <View style={{flexDirection:'row',alignItems: 'center'}}>
              <Image style={styles.commentAvatar}
                     source={{uri: this.props.avatarUrl ? this.props.avatarUrl : IMG_PREFIX + 'default_head.png'}}/>
              <Text style={{fontWeight:'bold',fontSize:18}}>{this.props.nickname}</Text>
            </View>
            <Text style={{marginRight:10,fontSize:12,color:'gray'}}>{this.props.time}</Text>
          </View>
          <Text style={{marginLeft:45,marginTop:25,marginBottom:20,fontSize:18}}>{this.props.commentContent}</Text>
          <View style={[styles.separator,{backgroundColor: '#CCCCCC',}]}/>
        </View>
    )
  }
}

var VideoView = React.createClass({
  mixins: [
    Reflux.connect(VideoStore)
  ],
  finish(){
    //完成当前的type , step
    VideoActionCreators.finishTurning();
    this.props.navigator.push(Router.getResult());
  }
  ,
  getInitialState: function () {
    return {
      showControl: false,
      paused: false,
      muted: false,
      showSendComment: false
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
  switchCommentButton(){
    this.setState({
      showSendComment: !this.state.showSendComment,
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
              <Image style={styles.playButton} source={{uri:IMG_PREFIX + 'video_info.png'}}/>
            </View>
            <View style={styles.voiceWrapper}>
              <TouchableWithoutFeedback onPress={this.closeVoice}>
                <Image style={styles.playButton}
                       source={{uri: this.state.muted ? IMG_PREFIX + 'video_sound_open.png' : IMG_PREFIX + 'video_sound_close.png'}}/>
              </TouchableWithoutFeedback>
            </View>
          </View>
      ;
    }

    var commentView = <View></View>;
    if (this.state.comments && this.state.comments.length > 0) {  //有评论
      var content = [];
      for (var i in this.state.comments) {
        var comment = this.state.comments[i];
        content.push(
            <CommentItem
                nickname={comment.nickname}
                time={comment.time}
                commentContent={comment.commentContent}
                />
        );
      }
      commentView = <View>{content}</View>
    }

    var videoView = <View></View>;
    if(this.state.ref.videoUrl){
      videoView =    <Video
          source={{uri: this.state.ref.videoUrl}} // Can be a URL or a local file.
          rate={1.0}                   // 0 is paused, 1 is normal.
          volume={1.0}                 // 0 is muted, 1 is normal.
          muted={this.state.muted}                // Mutes the audio entirely.
          paused={this.state.paused}               // Pauses playback entirely.
          repeat={true}// Repeat forever.
          style={styles.video}
          resizeMode="cover"
          />;
    }

    return (
        <View>
          <ScrollView style={styles.main}>
            <TouchableWithoutFeedback onPress={this.press} style={styles.listView}>
              {videoView}
            </TouchableWithoutFeedback>
            {controlView}
            <View style={{alignItems: 'center',flex:1}}>
              <Text style={styles.title_text}>第一式: 墙壁俯卧撑</Text>
              <View style={styles.month}>
                <TouchableHighlight onPress={this.prev}>
                  <Image source={{uri:IMG_PREFIX + 'btn_arrow_left01.png'}} style={styles.buttonIcon}/>
                </TouchableHighlight>
                <Text style={styles.month_text}>初级标准</Text>
                <TouchableHighlight onPress={this.next}>
                  <Image source={{uri:IMG_PREFIX + 'btn_arrow_right01.png'}} style={styles.buttonIcon}/>
                </TouchableHighlight>
              </View>
              <View style={styles.turningAnalytics}>
                <Image source={{uri:IMG_PREFIX + 'ico_x01.png'}} style={styles.x02}/>
                <Text style={styles.turningAnalyticsText}>1组, 10次</Text>
                <Image source={{uri:IMG_PREFIX + 'ico_x01.png'}} style={styles.x02}/>
              </View>
            </View>
            <View style={styles.separator}/>
            <TouchableHighlight
                onPress={this.finish}
                style={[{
                        marginTop:40,
                        marginLeft:40,
                        marginRight:40,

                        height:60,
                        backgroundColor: 'black',},Theme.centerChild]}
                >
              <Text style={styles.actionText}>完成!</Text>
            </TouchableHighlight>
            <TouchableWithoutFeedback onPress={() => this.props.navigator.push(Router.getTrend())}
                >
              <View style={[Theme.centerChild,{paddingBottom:20,paddingTop:20,}]}>
                <Text style={styles.turingText}>10个人完成该训练</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={[styles.separator,{height: 2,}]}/>
            <Text style={{marginLeft:10,marginTop:15}}>{this.state.comments.length}条评论</Text>
            {commentView}
          </ScrollView>
          <TouchableHighlight
              onPress={() => this.props.navigator.push(Router.getPost())}
              style={[styles.commentButton,Theme.centerChild,{
                        backgroundColor: 'black',
                        paddingTop: 20,
                        paddingBottom: 20,
                        }]}
              >
            <Text style={styles.actionText}>写评论</Text>
          </TouchableHighlight>
        </View>
    );

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
  infoWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: deviceScreen.width - 140,
    top: 10,
    backgroundColor: 'transparent',
  },
  voiceWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
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
  listView: {
    flex: 1
  },
  video: {
    width: deviceScreen.width,
    height: videoHeight,
  },
  nav: {
    flex: 1,
    height: 64,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
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
  },
  commentTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center'
  },
  month: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 40,
    marginTop: 40,
    alignItems: 'center'
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
  turingText: {},
  main: {
    height: deviceScreen.height,
  },
  commentAvatar: {
    height: 25,
    width: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  commentButton: {
    position: 'absolute',
    left: 0,
    top: deviceScreen.height - 80,
    width: deviceScreen.width,
  }
});

module.exports = VideoView;
