/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var Reflux = require('reflux');
var ProfileStore = require('../../stores/ProfileStore');
var deviceScreen = require('Dimensions').get('window');
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var Chart = require('../../components/RNChart');
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
    PixelRatio
    } = React;


var StepsView = React.createClass({
  mixins: [
    Reflux.connect(ProfileStore)
  ],
  //getInitialState: function () {
  //  //ResumesActionCreators.fetchResumes();
  //  return {
  //
  //  };
  //},
  pop(){
    this.props.navigator.pop();
  },
  share(){
    //TODO
  },
  render: function () {
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
                webLineWidth={2}
                data={{
                      x:['俯卧撑','倒立撑','桥','引体向上','深蹲','举腿'],
                      y:[3,2,5,1,7,8]
                      }}
                />
          </View>
          <View style={styles.tableWrapper}>
            <RecordItem
                type='俯卧撑'
                desc='第五式 标准俯卧撑'
                step='中级'
                />
            <RecordItem
                type='俯卧撑'
                desc='第五式 标准俯卧撑'
                step='中级'
                />
            <RecordItem
                type='俯卧撑'
                desc='第五式 标准俯卧撑'
                step='中级'
                />
            <RecordItem
                type='俯卧撑'
                desc='第五式 标准俯卧撑'
                step='中级'
                />
            <RecordItem
                type='俯卧撑'
                desc='第五式 标准俯卧撑'
                step='中级'
                />
            <RecordItem
                type='俯卧撑'
                desc='第五式 标准俯卧撑'
                step='中级'
                />
          </View>
          <View style={styles.turningAnalytics}>
            <Image source={{uri:IMG_PREFIX + 'ico_x02.png'}} style={styles.x02}/>
            <Text style={styles.turningAnalyticsText}>训练记录</Text>
            <Image source={{uri:IMG_PREFIX + 'ico_x02.png'}} style={styles.x02}/>
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
  contentWrapper:{
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    padding: 30,
  },
  content: {
    color: 'white',
  },
  recordWrapper: {
    flexDirection: 'row',
  },
  chartWrapper: {
    padding: 20
  },
  chart: {
    height: 300,
    width: 300,
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
    color: 'white',
    marginLeft: 20,
    marginRight: 20
  },
  main: {
    backgroundColor: 'black',
    height: 300,
  },
  nav: {
    flex: 1,
    height: 120 / PixelRatio.get(),
    backgroundColor: 'black',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 40 / PixelRatio.get(),
    height: 180 / PixelRatio.get(),
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  icon: {
    width: 450 / PixelRatio.get(),
    height: 100 / PixelRatio.get(),

  },
  logo: {
    paddingTop: 0 / PixelRatio.get(),
    paddingBottom: 10 / PixelRatio.get(),
    paddingLeft: 150 / PixelRatio.get(),
    paddingRight: 150 / PixelRatio.get(),
  },
  itemIcon: {
    width: 100 / PixelRatio.get(),
    height: 100 / PixelRatio.get(),
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    paddingLeft: 20 / PixelRatio.get(),
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemProcessText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backWrapper: {
    paddingLeft: 50 / PixelRatio.get(),
  },
  shareWrapper: {
    paddingRight: 50 / PixelRatio.get(),
  },
  profileImage: {
    left: 0,
    top: 0,
    width: 100 / PixelRatio.get(),
    height: 100 / PixelRatio.get(),
  }
});

module.exports = StepsView;

//<TouchableOpacity onPress={this.pop}>
//  <Text style={{marginLeft:20,marginTop:20}}>关闭</Text>
//</TouchableOpacity>
//<Text style={{marginLeft:40}}>俯卧撑系列升级表</Text>
//
