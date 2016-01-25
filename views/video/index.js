/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');

var VideoStore = require('../../stores/VideoStore');
var StepList = require('../steplist');
var Video = require('../../components/video');
var Reflux = require('reflux');
var Router = require('../router');
import VideoActionCreators from '../../actions/VideoActionCreators';

import Theme from '../theme';
var VideoModal = require('./modal');
var Modal = require('react-native-fs-modal');
import Picker from '../LandscapePicker';
var ShareAction = require('../../actions/ShareResultActionCreators');
var osUtils = require('../../utils');
var I18n = require('react-native-i18n');

//var _ = require('lodash');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    Animated,
    InteractionManager,
    Dimensions
    } = React;
var deviceScreen = Dimensions.get('window');
let videoHeight = deviceScreen.width / 1.73;

class CommentItem extends React.Component {
  render() {
    var avatarIcon;
    if (this.props.avatarUrl) {
      avatarIcon = <Image style={styles.commentAvatar}
                          source={{uri: this.props.avatarUrl}}/>
    } else {
      avatarIcon = <Image style={styles.commentAvatar} source={require('../../images/default_head.png')}/>
    }
    return (
        <View>
          <View style={[styles.commentTitle,Theme.subTitleFont]}>
            <View style={{flexDirection:'row',alignItems: 'center'}}>
              {avatarIcon}
              <Text style={[{fontWeight:'bold',fontSize:18},Theme.descFont]}>{this.props.nickname}</Text>
            </View>
            <Text style={[{marginRight:10,fontSize:12,color:'gray'},Theme.descFont]}>{this.props.time}</Text>
          </View>
          <Text
              style={[{marginLeft:45,marginTop:25,marginBottom:20,fontSize:18},Theme.descFont]}>{this.props.commentContent}</Text>
          <View style={[styles.separator,{backgroundColor: '#CCCCCC',}]}/>
        </View>
    )
  }
}

var offsetY = 0;

var VideoView = React.createClass({
  mixins: [
    Reflux.connect(VideoStore)
  ],
  finish(){
    this.refs.modal.close();
    //完成当前的type , step
    ShareAction.setShareResult(this.state.ref.typeText, this.state.subStep, this.state.ref.subStep[this.state.subStepIndex]);
    VideoActionCreators.finishTurning(this.state.subStep);
    this.props.navigator.push(Router.getResult());
    this.setState({videoFinish: true});//stop video
  },
  closeModal(){
    this.refs.modal.close();
  },
  showModal(){
    this.refs.modal.show();
  }
  ,
  getInitialState: function () {
    return {
      videoFinish: false,
      showSendComment: false,
      subStep: I18n.t('primary'),
      subStepIndex: 0,//2 * 50 这种..
      commentButtonTop: new Animated.Value(deviceScreen.height - 60 - osUtils.getStatusHeight()),  //默认出现
    };
  },
  componentWillMount: function () {
    InteractionManager.runAfterInteractions(() => {
      //加载评论
      VideoActionCreators.refreshComments();
      //加载动态数量
      VideoActionCreators.getTrendCount();
      //加载动态列表
      VideoActionCreators.pullNextTrends();
    });
  },
  showCommentButton(){
    Animated.timing(          // Uses easing functions
        this.state.commentButtonTop,    // The value to drive
        {toValue: deviceScreen.height - 60 - osUtils.getStatusHeight(), duration: 100}
    ).start();
  },
  hideCommentButton(){
    Animated.timing(          // Uses easing functions
        this.state.commentButtonTop,    // The value to drive
        {toValue: deviceScreen.height, duration: 100}           // Configuration
    ).start();
  },
  switchCommentButton(){
    this.setState({
      showSendComment: !this.state.showSendComment,
    });
  },
  _onScroll(event){
    var y = event.nativeEvent.contentOffset.y;
    if (y < offsetY) {
      this.hideCommentButton();
      offsetY = y;
    } else {
      this.showCommentButton();
      offsetY = y;
    }
  },
  render: function () {
    var videoView = <View></View>;
    if (typeof this.state.ref.videoUrl !== 'undefined') {
      videoView = <Video
          url={this.state.ref.videoUrl}
          paused={this.state.videoFinish}
          { ... this.props}
          />
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
                avatarUrl={comment.avatarUrl}
                />
        );
      }
      commentView = <View>{content}</View>
    }
    return (
        <View>
          {videoView}
          <TouchableWithoutFeedback onPress={() => this.props.navigator.pop()}>
            <Image source={require('../../images/btn_close.png')} style={styles.closeImage}/>
          </TouchableWithoutFeedback>
          <ScrollView style={styles.main}
                      onScroll={this._onScroll}
                      scrollEventThrottle={10}
              >
            <View style={{alignItems: 'center',flex:1}}>
              <Text style={[styles.title_text,Theme.title]}>{this.state.ref.typeText}</Text>
              <Picker
                  items={[I18n.t('primary'),I18n.t('intermediate'),I18n.t('advanced')]}
                  onChangeItem={(index,text)=>this.setState({subStepIndex:index,subStep:text})}
                  />
              <View style={styles.turningAnalytics}>
                <Image source={require('../../images/ico_x01.png')} style={styles.x02}/>
                <Text
                    style={[styles.turningAnalyticsText,Theme.subTitleFont]}>{this.state.ref.subStep ? this.state.ref.subStep[this.state.subStepIndex] : ''}</Text>
                <Image source={require('../../images/ico_x01.png')} style={styles.x02}/>
              </View>
            </View>
            <View style={styles.separator}/>
            <TouchableHighlight
                onPress={this.showModal}
                style={[{
                        marginTop:40,
                        marginLeft:40,
                        marginRight:40,

                        height:60,
                        backgroundColor: 'black',},Theme.centerChild]}
                >
              <Text style={[styles.actionText,Theme.subTitleFont]}>{I18n.t('complete')}</Text>
            </TouchableHighlight>
            <TouchableWithoutFeedback onPress={() => this.props.navigator.push(Router.getTrend())}
                >
              <View style={[Theme.centerChild,{paddingBottom:20,paddingTop:20,}]}>
                <Text
                    style={[styles.turingText,Theme.descFont]}>{this.state.trendCount + I18n.t('finish_turning')}</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={[styles.separator,{height: 2,}]}/>
            <Text
                style={[{marginLeft:10,marginTop:15},Theme.descFont]}>{this.state.comments.length + I18n.t('comments')}</Text>
            {commentView}
          </ScrollView>
          <Animated.View
              style={{
                        position: 'absolute',
                        left: 0,
                        top: this.state.commentButtonTop,
              }}
              >
            <TouchableHighlight
                onPress={() => userId === 'unset' ? this.props.navigator.push(Router.getWelcome()) : this.props.navigator.push(Router.getPost())}
                style={[Theme.centerChild,{
                        backgroundColor: 'black',
                        width: deviceScreen.width,
                        height: 60
                        }]}
                >
              <Text style={[styles.actionText,Theme.subTitleFont]}>{I18n.t('comment')}</Text>
            </TouchableHighlight>
          </Animated.View>
          <Modal
              ref={'modal'}
              duration={10}
              tween={'linear'}
              modalStyle={styles.modalStyle}
              hideStatusBar={false}
              closeOnTouch={true}
              >
            <View>
              <VideoModal
                  typeName={this.state.ref.type}
                  stepName={this.state.ref.typeText}
                  subStep={this.state.subStep}
                  actionClick={this.finish}
                  />
            </View>
          </Modal>
        </View>
    );

  }
});


var styles = StyleSheet.create({
  listView: {
    flex: 1
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
    textAlign: 'center'
  },
  commentTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center'
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
    height: deviceScreen.height - videoHeight,
  },
  commentAvatar: {
    height: 25,
    width: 25,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 13,
    borderWidth: 0,
  },
  modalStyle: {
    height: 365,
    width: 315,
    marginTop: (deviceScreen.height - 365) / 2,
    marginLeft: (deviceScreen.width - 315 - 40) / 2,
  },
  closeImage: {
    position: 'absolute', //有的就可以,有的就显示不出来
    left: 0,
    top: 0,
    width: 64,
    height: 64,
    backgroundColor: 'transparent',
  },
});

module.exports = VideoView;
