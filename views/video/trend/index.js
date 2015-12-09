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
} from 'react-native';
import Nav from "../../nav/CommonNav";
import Reflux from 'reflux';
import TrendStore from '../../../stores/TrendStore';
import Separator from '../../../components/Separator'
var deviceScreen = require('Dimensions').get('window');

class TrendItem extends React.Component {
  render(){
    return (
        <View style={styles.container}>
          <View>
            <Text>{this.props.nickname}</Text>
            <Text>{this.props.time}</Text>
          </View>
          <Separator />
        </View>
    )
  }
}

var Trend = React.createClass( {
  mixins: [
    Reflux.connect(TrendStore)
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
              navText = {'训练动态'}
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
            time={q.time}
            {...this.props}
            />
    );
  }

});

var styles = StyleSheet.create({
  listView: {
    flex: 1,
    height:deviceScreen.height - 60
  },
  container: {
    flex: 1,
    height: 60,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

module.exports = Trend;
