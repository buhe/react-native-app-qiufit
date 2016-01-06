/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var Reflux = require('reflux');
var StepStore = require('../../stores/StepStore');
var deviceScreen = require('Dimensions').get('window');
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var Chart = require('../../components/RNChart');
var CheckIn = require('../../components/RNCheckIn');
import _ from 'lodash';

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
    PixelRatio
    } = React;


var ProfileView = React.createClass({
  mixins: [
    Reflux.connect(StepStore)
  ],
  getInitialState: function () {
    return {
      chartData: {},
      tableData: []
    }
  },
  pop(){
    this.props.navigator.pop();
  },
  share(){
    //TODO
  },
  componentWillMount(){
    var tableData = [];
    let x = _.values(StepStore.stepNameMap);
    var y = [];
    for (var key in StepStore.stepNameMap) {
      var steps = this.state.data[key];
      if (steps) {
        var step = _.max(steps, function (step) {
          return step.get('step');
        });
        y.push(step.get('step') + 1);//索引从0开始,故+1
        tableData.push({
          type: key,
          step: step.get('step'),
          level: step.get('level') ? step.get('level') :'初级标准',
        });
      } else {
        y.push(1);
        tableData.push({
          type: key,
          step: 0,
          level: '初级标准',
        });
      }

    }
    this.setState({
      chartData: {
        x: x,
        y: y,
        dataColor: 'white',
      },
      tableData: tableData,
    });
  },
  render: function () {

    var tableView = this.state.tableData.map(function (row) {
      return <RecordItem
          type={StepStore.stepNameMap[row.type]}
          desc={StepStore.stepsMap[row.type][row.step].text1}
          step={row.level}
          />;
    });
    return (
        <ScrollView style={styles.main}>
          <View style={styles.nav}>
            <TouchableOpacity onPress={this.pop} style={styles.backWrapper}>
              <Image source={{uri:IMG_PREFIX + 'navigation_back.png'}} style={styles.profileImage}/>
            </TouchableOpacity>
            <View style={styles.logo}>
              <Image source={{uri:IMG_PREFIX + 'start_02.png'}} style={styles.icon}/>
            </View>
            <TouchableOpacity onPress={this.share} style={styles.shareWrapper}>
              <Image source={{uri:IMG_PREFIX + 'navifation_share.png'}} style={styles.profileImage}/>
            </TouchableOpacity>
          </View>
          <View style={styles.turningAnalytics}>
            <Image source={{uri:IMG_PREFIX + 'ico_x02.png'}} style={styles.x02}/>
            <Text style={styles.turningAnalyticsText}>训练分析</Text>
            <Image source={{uri:IMG_PREFIX + 'ico_x02.png'}} style={styles.x02}/>
          </View>
          <View style={styles.chartWrapper}>
            <Chart
                style={styles.chart}
                data={this.state.chartData}
                />
          </View>
          <View style={styles.tableWrapper}>
            {tableView}
          </View>
          <View style={styles.turningAnalytics}>
            <Image source={{uri:IMG_PREFIX + 'ico_x02.png'}} style={styles.x02}/>
            <Text style={styles.turningAnalyticsText}>训练记录</Text>
            <Image source={{uri:IMG_PREFIX + 'ico_x02.png'}} style={styles.x02}/>
          </View>
          <CheckIn
              months={{
                    '2015-11': [
                    '2015-11-1',
                    '2015-11-2',
                    '2015-11-3',
                    '2015-11-9',
                    ],
                    '2015-10': [
                    '2015-10-1',
                    '2015-10-2',
                    '2015-10-3',
                    '2015-10-9',
                    ],
                    }}
              />
          <View style={styles.bottomView}>
            <Image source={{uri:IMG_PREFIX + 'me_logo.png'}} style={styles.bottomIcon}/>
            <Text style={[styles.content,styles.bottomText]}>囚徒健身 Design By cheng zhen</Text>
            <Text style={[styles.content,styles.bottomText]}>囚徒健身 Code With ♥ By bu he</Text>
            <Text style={[styles.content,styles.bottomText,styles.lastText]}>V 1.0</Text>
          </View>
        </ScrollView>
    );

  }
});

class RecordItem extends React.Component {
  render() {
    return (
        <View style={styles.recordWrapper}>
          <View style={styles.contentWrapper}><Text style={styles.content}>{this.props.type}</Text></View>
          <View style={styles.contentWrapper}><Text style={styles.content}>{this.props.desc}</Text></View>
          <View style={styles.contentWrapper}><Text style={styles.content}>{this.props.step}</Text></View>
        </View>
    )
  }
}

var styles = StyleSheet.create({
  //Table
  tableWrapper: {
    width: deviceScreen.width,
  },
  contentWrapper: {//FIXME -- 表格线有问题
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  content: {
    color: 'white',
    fontSize: 12,
  },
  recordWrapper: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
  },
  //Chart
  chartWrapper: {
    padding: 20
  },
  chart: {
    height: 300,
    width: 300,
  },
  //Turning Label
  turningAnalytics: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  x02: {
    height: 20,
    width: 20
  },
  turningAnalyticsText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20
  },
  main: {
    backgroundColor: '#1d1d1d',
    height: deviceScreen.height,
  },
  //Nav bar
  nav: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    width: deviceScreen.width,
    justifyContent: 'space-between'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  icon: {
    width: 127,
    height: 27,

  },
  logo: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  backWrapper: {
    paddingTop: 15,
    paddingLeft: 15,
  },
  shareWrapper: {
    paddingTop: 15,
    paddingRight: 15,
  },
  profileImage: {
    width: 27,
    height: 27,
  },
  //Bottom area
  bottomIcon: {
    width: 175,
    height: 65,
  },
  bottomView: {
    marginTop: 40,
    alignItems: 'center',
  },
  bottomText: {
    marginTop: 10
  },
  lastText: {
    marginBottom: 20
  }
});

module.exports = ProfileView;
