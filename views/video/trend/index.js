/**
 * es6 不支持 mixins
 * 动态
 * Created by guguyanhua on 12/9/15.
 */
import React, {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ListView,
    Dimensions,
} from 'react-native';
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
import Nav from "../../nav/CommonNav";
import Reflux from 'reflux';
import VideoStore from '../../../stores/VideoStore';
import Separator from '../../../components/Separator'
var deviceScreen = Dimensions.get('window');

class TrendItem extends React.Component {
  render() {
    return (
        <View>
          <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
              <Image style={styles.commentAvatar}
                     source={{uri: this.props.avatarUrl ? this.props.avatarUrl : IMG_PREFIX + 'default_head.png'}}/>
              <Text>{this.props.nickname}</Text>
            </View>
            <Text style={{marginRight:10,fontSize:12,color:'gray'}}>{this.props.date}</Text>
          </View>
          <Separator />
        </View>
    )
  }
}

var Trend = React.createClass({
  mixins: [
    Reflux.connect(VideoStore)
  ],
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },
  render(){
    return (
        <View>
          <Nav
              navText={'训练动态'}
              {... this.props}
              />
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.trends)}
              renderRow={this.renderTrend}
              style={styles.listView}
              />
        </View>
    );
  },
  renderTrend: function (q) {
    return ( <TrendItem
            nickname={q.nickname}
            date={q.date}
            avatarUrl={q.avatarUrl}
            {...this.props}
            />
    );
  }

});

var styles = StyleSheet.create({
  listView: {
    flex: 1,
    height: deviceScreen.height - 60
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    width: deviceScreen.width,
  },
  commentAvatar: {
    height: 25,
    width: 25,
    marginLeft: 10,
    marginRight: 10,
  },
});

module.exports = Trend;
