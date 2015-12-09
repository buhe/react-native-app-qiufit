/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');

var CommentStore = require('../../stores/CommentStore');
var StepList = require('../steplist');
var Video = require('../../components/RNVideo');
var deviceScreen = require('Dimensions').get('window');
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var Reflux = require('reflux');
var Router = require('../router');
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

class CommentItem extends React.Component {
  render() {
    return (
        <View>
          <View style={styles.commentTitle}>
            <Image style={styles.commentAvatar}
                   source={{uri: this.props.avatarUrl ? this.props.avatarUrl : IMG_PREFIX + 'default_head.png'}}/>
            <Text>{this.props.nickname}</Text>
            <Text>{this.props.time}</Text>
          </View>
          <Text>{this.props.commentContent}</Text>
          <View style={[styles.separator,{backgroundColor: '#CCCCCC',}]}/>
        </View>
    )
  }
}

var VideoView = React.createClass({
  mixins: [
    Reflux.connect(CommentStore)
  ],
  getInitialState: function () {
    return {
      showControl: false,
      paused: false,
      voice: true,
      showSendComment: false
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

    return (
        <View>
          <ScrollView style={styles.main}>
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
                onPress={()=> this.props.navigator.push(Router.getResult())}
                style={{
                        marginTop:40,
                        marginLeft:40,
                        marginRight:40,
                        marginBottom:20,
                        paddingTop: 20,
                        paddingLeft:120,
                        paddingBottom:20,
                        backgroundColor: 'black',}}
                >
              <Text style={styles.actionText}>完成!</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                        paddingLeft:120,
                        paddingBottom:20,
                        }}
                >
              <TouchableOpacity onPress={() => this.props.navigator.push(Router.getTrend())}>
                <Text style={styles.turingText}>完10个人完成该训练</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.avatarList}>
            </View>
            <View style={[styles.separator,{height: 2,}]}/>
            <Text>{this.state.comments.length}条评论</Text>
            {commentView}
          </ScrollView>
          <TouchableOpacity
              onPress={() => this.props.navigator.push(Router.getPost())}
              style={[styles.commentButton,{
                        paddingTop: 20,
                        paddingBottom: 20,
                        paddingLeft:150,
                        backgroundColor: 'black',}]}
              >
            <Text style={styles.actionText}>写评论</Text>
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
  commentTitle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 40,
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
  turingText: {},
  main: {
    height: deviceScreen.height,
  },
  commentAvatar: {
    height: 32,
    width: 32
  },
  commentButton: {
    position: 'absolute',
    left: 0,
    top: deviceScreen.height - 80,
    width: deviceScreen.width,
  }
});

module.exports = VideoView;
