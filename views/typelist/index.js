/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var StepList = require('../steplist');
//var Reflux = require('reflux');
//var _ = require('lodash');
var StepActionCreators = require('../../actions/StepActionCreators');
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var deviceScreen = require('Dimensions').get('window');

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
var Router = require('../router');

var typeList = [
  {
    name: 'pushUp',
    type: "俯卧撑",
    icon: IMG_PREFIX + 'a.png',
    process: '2/10'
  },
  {
    name: 'deep',
    type: "深蹲",
    icon: IMG_PREFIX + 'b.png',
    process: '2/10'
  },
  {
    name: 'pullUp',
    type: "引体向上",
    icon: IMG_PREFIX + 'c.png',
    process: '0/10'
  },
  {
    name: 'leg',
    type: "举腿",
    icon: IMG_PREFIX + 'd.png',
    process: '0/10'
  },
  {
    name: 'bridge',
    type: "桥",
    icon: IMG_PREFIX + 'e.png',
    process: '0/10'
  },
  {
    name: 'handstand',
    type: "倒立撑",
    icon: IMG_PREFIX + 'f.png',
    process: '0/10'
  },
];


var TypeItem = React.createClass({
  pushPaperById(){
    StepActionCreators.fetchByType(this.props.name);
    this.props.navigator.push(Router.getStepList());
  },
  render: function () {
    return (
        <TouchableOpacity onPress={this.pushPaperById}>
          <View style={styles.container}>
            <Image source={{uri:this.props.icon}} style={styles.itemIcon}/>
            <View style={styles.itemTextWrapper}>
              <Text style={styles.itemText}>{this.props.type}</Text>
              <Text style={styles.itemProcessText}>{this.props.process}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </TouchableOpacity>
    );
  }
});

var TypesView = React.createClass({
  profile(){
    this.props.navigator.push(Router.getProfile());
  },
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      typeList: typeList
    };
  },
  render: function () {
    return (
        <View>
          <View style={styles.nav}>
            <TouchableOpacity onPress={this.profile} style={styles.profileWrapper}>
              <Image source={{uri:IMG_PREFIX + 'navigation_me.png'}} style={styles.profileImage}/>
            </TouchableOpacity>
            <View style={styles.logo}>
              <Image source={{uri:IMG_PREFIX + 'start_02.png'}} style={styles.icon}/>
            </View>
          </View>
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.typeList)}
              renderRow={this.renderType}
              style={styles.listView}
              />
        </View>
    );

  },
  renderType: function (q) {
    return ( <TypeItem
            name={q.name}
            type={q.type}
            key={q.type}
            icon={q.icon}
            process={q.process}
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
    paddingRight: 300 / PixelRatio.get(),
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
  profileWrapper: {
    paddingLeft: 50 / PixelRatio.get(),
  },
  profileImage: {
    left: 0,
    top: 0,
    width: 100 / PixelRatio.get(),
    height: 100 / PixelRatio.get(),
  }
});

module.exports = TypesView;
