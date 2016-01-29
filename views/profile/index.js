/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var Reflux = require('reflux');
var StepStore = require('../../stores/StepStore');
var ProfileActionCreators = require('../../actions/ProfileActionCreators');
var ProfileStore = require('../../stores/ProfileStore');
var Chart = require('../../components/RNChart');
var CheckIn = require('../../components/RNCheckIn');
var ViewSnapshotter = require('../../snapshot');
var WeChat = require('../../wechat').default;
var osUtils = require('../../utils');
var Theme = require('../theme');
import _ from 'lodash';
import Button from '../button';
import Promation from '../../promation';

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    ScrollView,
    Image,
    PixelRatio,
    Dimensions,
    Alert
    } = React;
var deviceScreen = Dimensions.get('window');
function getMaxLevel(levels) {
  if (levels) {
    if (_.includes(levels, '高级标准')) {
      return '高级标准';
    } else if (_.includes(levels, '中级标准')) {
      return '中级标准';
    } else if (_.includes(levels, '初级标准')) {
      return '初级标准';
    } else {
      return '初级标准';
    }
  } else {
    return '初级标准';
  }
}


var ProfileView = React.createClass({
  mixins: [
    Reflux.connect(StepStore),
    Reflux.connect(ProfileStore)
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
    if (userId === 'unset') {
      return;
    }
    var imagePath = osUtils.getCacheDir() + "/share.png";
    var ref = React.findNodeHandle(this.refs.shareView);
    ViewSnapshotter.saveSnapshotToPath(React.findNodeHandle(ref), imagePath, (error, successfulWrite) => {
      if (successfulWrite) {
        WeChat.shareImage({
          path: imagePath,
          tagName: '囚徒健身',
          title: '囚徒健身',
          desc: '囚徒健身',
          thumbPath: imagePath,
          scene: 1
        });
      } else {
        console.log(error)
      }
    });
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
          level: getMaxLevel(step.get('levels')),
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
    var shareButton = <View />;
    if(installWechat){
     shareButton = <TouchableOpacity onPress={this.share} style={styles.shareWrapper}>
                      <Image source={require('../../images/navifation_share.png')} style={styles.profileImage}/>
                  </TouchableOpacity>;
    }
    return (
        <View style={{backgroundColor: '#1d1d1d'}}>
          <View style={styles.nav}>
            <TouchableOpacity onPress={this.pop} style={styles.backWrapper}>
              <Image source={require('../../images/navigation_back.png')} style={styles.profileImage}/>
            </TouchableOpacity>
            <View style={styles.logo}>
              <Image source={require('../../images/start_02.png')} style={styles.icon}/>
            </View>
            {shareButton}
          </View>
          <ScrollView style={styles.main} ref='shareView'
                      contentContainerStyle={{alignItems:'center'}}
              >
            <View style={styles.turningAnalytics}>
              <Image source={require('../../images/ico_x02.png')} style={styles.x02}/>
              <Text style={styles.turningAnalyticsText}>训练分析</Text>
              <Image source={require('../../images/ico_x02.png')} style={styles.x02}/>
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
              <Image source={require('../../images/ico_x02.png')} style={styles.x02}/>
              <Text style={styles.turningAnalyticsText}>训练记录</Text>
              <Image source={require('../../images/ico_x02.png')} style={styles.x02}/>
            </View>
            <View style={{width:deviceScreen.width}}>
              <CheckIn
                  months={this.state.checkIn ? this.state.checkIn : {}}
                  />
            </View>
            <View style={styles.bottomView}>
              <Image source={require('../../images/me_logo.png')} style={styles.bottomIcon}/>
              <Text style={[styles.content,styles.bottomText]}>囚徒健身 Design By cheng zhen</Text>
              <Text style={[styles.content,styles.bottomText]}>囚徒健身 Code With ♥ By bu he</Text>
              <Text style={[styles.content,styles.bottomText,styles.lastText]}>V 1.0</Text>
            </View>
            <TouchableOpacity onPress={()=> Promation.openMarket()} style={{marginBottom:50}}>
              <Image source={require('../../images/spread.png')}/>
            </TouchableOpacity>
          </ScrollView>
        </View>
    );

  }
});

//<TouchableOpacity
//    onPress={() => Alert.alert(
//            '陛下用了这么久, 感觉如何? ',
//            null,
//            [
//              {text: '深得朕心', onPress: () => Promation.review()},
//              {text: '不得朕心'},
//              {text: '朕在看看'},
//            ]
//          )}>
//  <View style={{width:100,height:100}}>
//    <Text>评价</Text>
//  </View>
//</TouchableOpacity>

class RecordItem extends React.Component {
  render() {
    return (
        <View style={styles.recordWrapper}>
          <View style={[styles.contentWrapper,Theme.centerChild,{width: deviceScreen.width * 0.25}]}><Text
              style={styles.content}>{this.props.type}</Text></View>
          <View style={[styles.contentWrapper,Theme.centerChild,{width: deviceScreen.width * 0.5}]}><Text
              style={styles.content}>{this.props.desc}</Text></View>
          <View style={[styles.contentWrapper,Theme.centerChild,{width: deviceScreen.width * 0.25}]}><Text
              style={styles.content}>{this.props.step}</Text></View>
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
    height: 55,
  },
  content: {
    color: 'white',
    fontSize: 12,
  },
  recordWrapper: {
    flexDirection: 'row',
    height: 55,
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
    height: deviceScreen.height - 60,
  },
  //Nav bar
  nav: {
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
