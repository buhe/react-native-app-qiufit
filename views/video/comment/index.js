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
    Dimensions
} from 'react-native';

import Nav from '../../nav/CommonNavRightButton';
var deviceScreen = Dimensions.get('window');
var VideoAction = require('../../../actions/VideoActionCreators');
var I18n = require('react-native-i18n');

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
              navText={I18n.t('comment')}
              rightText={I18n.t('post')}
              rightAction={this.post.bind(this)}
              {...this.props}
              />
          <TextInput
              style={{height: deviceScreen.height - 60,paddingTop:15,paddingLeft:10,paddingRight:10,fontSize:18}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              multiline={true}
              placeholder={I18n.t('ban_msg')}
              numberOfLines={100}
              textAlignVertical={'top'}
              placeholderTextColor={'#cccccc'}
              />
        </View>
    );
  }

}
module.exports = Comment;
