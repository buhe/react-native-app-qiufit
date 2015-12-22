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

import Nav from '../../nav/CommonNav';
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
              style={{height: deviceScreen.height - 60,paddingTop:15,paddingLeft:10,paddingRight:10}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              multiline={true}
              placeholder={'说人话'}
              numberOfLines={100}
              textAlignVertical={'top'}
              />
        </View>
    );
  }

}

export default Comment;
