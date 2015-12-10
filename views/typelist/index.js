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
            <TouchableOpacity onPress={this.profile}>
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
    height: deviceScreen.height - 60
  },
  nav: {
    flex: 1,
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    height: 90,
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
    paddingLeft: 75,
    paddingRight: 125,
  },
  itemIcon: {
    width: 50,
    height: 50,
    marginLeft: 15,
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d1d1d'
  },
  itemProcessText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#1d1d1d'
  },
  profileImage: {
    marginLeft: 15,
    marginTop: 15,
    width: 30,
    height: 30,
  }
});

module.exports = TypesView;
