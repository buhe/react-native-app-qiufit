/**
 * es6
 * Created by guguyanhua on 12/9/15.
 */
import React, {
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import Nav from '../../nav/CommonNavRightButton';
var deviceScreen = require('Dimensions').get('window');
var VideoAction = require('../../../actions/VideoActionCreators');

class Comment extends React.Component {
  post() {
    VideoAction.post(this.state.text);
    VideoAction.refreshComments();
    this.props.navigator.pop();
  }

  constructor(props) {
    super(props);
    this.state = {text: ''}
  }

  render() {
    return (
        <View>
          <Nav
              navText={'写评论'}
              rightText={'发布'}
              rightAction={this.post.bind(this)}
              {...this.props}
              />
          <TextInput
              style={{height: deviceScreen.height - 60,paddingTop:15,paddingLeft:10,paddingRight:10,fontSize:18}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              multiline={true}
              placeholder={'不友善的言论会被删除，深度讨论会被优先展示。'}
              numberOfLines={100}
              textAlignVertical={'top'}
              placeholderTextColor={'#cccccc'}
              />
        </View>
    );
  }

}

export default Comment;
